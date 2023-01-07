/**
 * @file Manage the configuration and connection to Mongoose
 * @author Ugo Balducci
 * @version 1.0.0
 */

const { MongoClient, Db } = require("mongodb");


/**
 * Configuration used for connecting the app to the MongoDB Server.
 */
const config = {
    username: "",
    password: '',
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017,
    databaseName: 'test_semester_project',
    userCollectionName: 'user_locations',
    latencyCollectionName: 'latency',
    locationCollectionName: 'locations',
}

// Database client saved for later use
let databaseClient = null


/**
 * Connect mongoose to the database, given the parameters
 * @return {Db} The database to connect to
 */

const dbConnect = () => {
    if(databaseClient) return databaseClient
    
    console.log("Connecting to MongoDB at : " + config.host + ":" + config.port )
    let connString = config.username ? `mongodb://${config.username}:${config.password}@${config.host}:${config.port || 27017}/${config.databaseName}` : `mongodb://${config.host}:${config.port || 27017}/${config.databaseName}`

    const client = new MongoClient(connString)
    const database = client.db(config.databaseName)

    database.command({ ping: 1 }).then(() => 
        console.log("Connected successfully to MongoDB")).catch((e) => 
        console.log("Error during connection to database: " + e)
        )

    databaseClient = database
    return database
}

module.exports = {
    config,
    dbConnect
}
