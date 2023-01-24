const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function connexion() {
    mongoose.set('strictQuery', false);
    // Here, we work only in locally database for developpmemt
    mongoose
        .connect(process.env.MONGODB_URI_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Connected - successfully - to " + mongoose.connection.host);
        });
}

module.exports = connexion;