const mongoose = require('mongoose');
const DB_NAME = 'Lyr-it';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/${DB_NAME}`;


mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.info(`Connect to db ${DB_NAME}`);
    })
    .catch(error => {
        console.error(`Unable to connect to db ${DB_NAME}: ${error}`);
    })
