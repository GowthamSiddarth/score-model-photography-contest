const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));

const SERVER_PORT = process.env.PORT || 5000;

app.listen(SERVER_PORT, () => console.log(`Server Up and running on port ${SERVER_PORT}`));