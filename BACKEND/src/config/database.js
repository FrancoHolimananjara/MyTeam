const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function connexion() {
    mongoose
    .connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("Connected - successfully - to " + mongoose.connection.host);
    }).catch(error => {
        if (error.code == "ETIMEOUT") {
            mongoose
            .connect(process.env.MONGODB_URI_LOCAL,{ useNewUrlParser: true, useUnifiedTopology: true})
            .then(()=>{
                console.log("Connected - successfully - to " + mongoose.connection.host);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    })
}

module.exports = connexion;