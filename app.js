const express = require('express');
const mongoose = require('mongoose'); //third party
const bodyParser = require('body-parser') //core module
const cors = require('cors');

const db = require('./database/db')
const Signuproute = require('./routes/Signuproute');
const Productroute = require('./routes/Productroute');
const Adminroute = require('./routes/Adminroute');
const app = express();

app.use(express.static("./pictures"));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(Signuproute);
app.use(Productroute);
app.use(Adminroute);

app.listen(90);