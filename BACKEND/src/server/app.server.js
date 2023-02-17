const express = require('express');
const router = require('../routes/index.route');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// database stuff 'confi -> connexion'
const connexion = require('../config/database');

dotenv.config({path : path.resolve(__dirname,'../../.env')})
const app = express();

app.use(cors());
app.use(express.json());

// Database connection stuff
connexion();

app.use("/api" , router);
module.exports = app;
