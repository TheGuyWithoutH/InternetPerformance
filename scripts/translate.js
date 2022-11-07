const { ObjectID } = require("bson");
const { MongoClient, Db } = require("mongodb");
const { exit } = require("process");
const fs = require("fs");



////////////////////////////////////////////
/////////PARAMETERS for Translation/////////
////////////////////////////////////////////
const parameters = {
    server_url: "127.0.0.1",
    port: 27017,
    db_name: 'test_semester_project',

    location_collection_name: "temp_user_locations",
    geoname_collection_name: "location_names",

    fieldUpdated: 'country'
}



/**
 * Connect to the database
 * @returns {Db} a MongoDB connection to the database
 */

const dbConnect = () => {
    const client = new MongoClient(`mongodb://` + parameters.server_url + ":" + parameters.port)
    const database = client.db(parameters.db_name)

    database.command({ ping: 1 }).then(() =>
        console.log("Connected successfully to MongoDB")).catch(() =>
            console.log("Error during connection to database")
        )

    return database
}



/**
 * Perform the query to find documents
 * @param {Db} db The MongoDB database
 * @param {String} collection The collection to query
 * @param {Object} aggregation The query parameters
 * @returns {Promise} The array resulting from the query
 */

const _dbQuery = (db, collection, aggregation) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).aggregate(aggregation)
            .toArray((err, result) => {
                if (err) throw reject(err);
                resolve(result);
            });
    })
}



/**
 * Test for ASCII Characters
 * @param {String} c The character to test
 * @returns {Boolean} true if the character is in the ASCII set
 */
const isAscii = (c) => c.charCodeAt(0) < 128



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// MAIN CODE ////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Connect to database
const db = dbConnect()


//  1. Get all location data from dataset
_dbQuery(db,
    parameters.location_collection_name,
    [{
        $match: { ['location.' + parameters.fieldUpdated]: { $exists: true } }
    }]).then(
        (doc) => {
            doc = doc.filter(elem => elem.location[parameters.fieldUpdated] && elem.location[parameters.fieldUpdated] !== null)
            doc = doc.slice(0, 100)
            const count = doc.length

            //  2. Translate them all concurrently
            Promise.all(doc.map(elem => {
                const str = elem.location[parameters.fieldUpdated]

                //Check for special entries with multiple names separated by " / ", "/" or a space
                if (str.includes(" / ")) {
                    elem.location[parameters.fieldUpdated] = str.split(' / ')[0]
                } else if (str.includes("/")) {
                    elem.location[parameters.fieldUpdated] = str.split('/')[0]
                } else if (str.includes(" ")) {
                    const idx = str.indexOf(" ")
                    if (isAscii(str.charAt(idx - 1)) !== isAscii(str.charAt(idx + 1))) elem.location[parameters.fieldUpdated] = str.split(' ')[0]
                }

                //Find the translation in geonames
                return db.collection(parameters.geoname_collection_name).findOne({
                    $and: [
                        {
                            $or: [
                                {
                                    name: elem.location[parameters.fieldUpdated]
                                },
                                {
                                    alternatenames:
                                    {
                                        $elemMatch: { $eq: elem.location[parameters.fieldUpdated] }
                                    }
                                }
                            ]
                        },
                        {
                            'feature class': "A"
                        }
                    ]
                }
                ).then(res => {

                    //  3. If the name exists in geoname, update the entry
                    if (res) {
                        const query = elem
                        query.location[parameters.fieldUpdated] = res.asciiname
                        return db.collection(parameters.location_collection_name + "_new").insertOne(query).then(upd => {
                            return 1
                        })
                    } else {
                        return elem.location[parameters.fieldUpdated]
                    }
                })
            }
            )).then(res => {
                console.log("Result : " + res.filter(elem => elem === 1).length + "/" + count)
                
                const out = fs.createWriteStream('mismatched_names_' + parameters.fieldUpdated + '.txt', "utf8");
                out.write(parameters.fieldUpdated + " not found :\n")

                res.filter(elem => elem !== 1).forEach(elem => {
                    console.log(elem)
                    out.write(" - " + elem + "\n")
                })

                out.end()
            })

        }).catch((err) => console.log(err))