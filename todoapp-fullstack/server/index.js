const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const Routes = require('./routes');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

console.log(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI)
mongoose.connection.on('error', () => {
	console.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
	process.exit(1)
})

const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`)
    next()
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger)
app.use(allowCrossDomain);
app.use('/api', Routes)

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port ' + (process.env.PORT || 3000))
});