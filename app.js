const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const nconf = require('./config/nconf');

const app = express();

mongoose.Promise = Promise;
mongoose.set('debug', true);

mongoose.connect(nconf.get('mongoURI'))
    .then(() => console.log('Mongo DB Connected'))
    .catch(err => console.log(err));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Express');
});

app.use('/auth', authRoutes);

module.exports = app;