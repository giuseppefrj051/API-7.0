require('dotenv').config();
const DBschema = require('./DBschema/apiDbSchema');
const mainRouter = require('./routes/mainRouter');
const apiRouter = require('./routes/route1');
const apiRouter2 = require('./routes/route2');
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // data base
const nodemailer = require('nodemailer'); // EMAIL


const port = process.env.PORT || 3000;
var d = new Date();
var dFormated = d.toLocaleString();
var server = app.listen(port, listening);
function listening() {console.log(`listening at port ${port} ...`)};



app.use(express.urlencoded({ extended: false})); // this is for read post data
app.use(express.json()); //this is to read json

//middleware

app.use('/route1', apiRouter);
app.use('/route2', apiRouter2);
app.use('/', apiRouter); // this ons in the end
//app.use(express.static('web'));
 
//DataBase
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
const db =  mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to database api-7 ${dFormated}`));


 
 


