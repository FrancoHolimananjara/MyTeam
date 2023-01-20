const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function connexion() {
    mongoose
        .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                mongoose
                    .connect(process.env.MONGODB_URI_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("Connected - successfully - to " + mongoose.connection.host);
                    });
            } else {
                console.log("Connected - successfully - to cluster " + mongoose.connection.host);
            }
        })
}

module.exports = connexion;