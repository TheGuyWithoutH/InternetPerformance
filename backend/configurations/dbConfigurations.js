/*
*   Configuration used for connecting the app to the MongoDB Server.
*   
*/
const mongoose = require('mongoose');

const config = {
    username: 'USERNAME',
    password: 'PASSWORD',
    host: 'HOST',
    port: 'PORT',
    databaseName: 'DATABASE_NAME',
}

const dbConnect = () => {
    //mongoose.connect(`mongodb://${config.username}:${config.password}@${config.host}:${config.port || 27017}/${config.databaseName}`,
    mongoose.connect(`mongodb://localhost:27017/test_semester_project`,
        { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));

}

module.exports = dbConnect
