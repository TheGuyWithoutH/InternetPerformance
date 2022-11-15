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
    password: 'PASSWORD',
    host: '127.0.0.1',
    port: '27017',
    databaseName: 'test_semester_project',
    userCollectionName: 'user_locations',
    latencyCollectionName: 'latency',
}


/**
 * Connect mongoose to the database, given the parameters
 * @return {Db} The database to connect to
 */

const dbConnect = () => {
    let connString = config.username ? `mongodb://${config.username}:${config.password}@${config.host}:${config.port || 27017}/${config.databaseName}` : `mongodb://${config.host}:${config.port || 27017}/${config.databaseName}`

    const client = new MongoClient(connString)
    const database = client.db(config.databaseName)

    database.command({ ping: 1 }).then(() => 
        console.log("Connected successfully to MongoDB")).catch(() => 
        console.log("Error during connection to database")
        )

    return database
}

module.exports = {
    config,
    dbConnect
}
