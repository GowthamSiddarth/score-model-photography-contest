const express = require('express');
const mongoose = require('mongoose');
const fileUploadParser = require('express-fileupload');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/v1/v0/controller/User');
const admin = require('./routes/api/v1/v0/controller/Admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUploadParser());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/v1.0/users', users);
app.use('/api/v1.0/admin', admin);

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));

const SERVER_PORT = process.env.PORT || 7000;

app.listen(SERVER_PORT, () => console.log(`Server Up and running on port ${SERVER_PORT}`));