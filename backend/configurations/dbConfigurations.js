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
    username: 'USERNAME',
    password: 'PASSWORD',
    host: 'HOST',
    port: 'PORT',
    databaseName: 'DATABASE_NAME',
}


/**
 * Connect mongoose to the database, given the parameters
 * @return {Db} The database to connect to
 */

const dbConnect = () => {
    let connString = config.username ? `mongodb://${config.username}:${config.password}@${config.host}:${config.port || 27017}/${config.databaseName}` : `mongodb://${config.host}:${config.port || 27017}/${config.databaseName}`

    //return new MongoClient(connString)
    const client = new MongoClient(`mongodb://127.0.0.1:27017`)
    const database = client.db('test_semester_project')

    database.command({ ping: 1 }).then(() => 
        console.log("Connected successfully to MongoDB")).catch(() => 
        console.log("Error during connection to database")
        )

    return database
}

module.exports = dbConnect
