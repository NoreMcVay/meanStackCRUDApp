// const path = require("path"); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require("./routes/user");

const app = express();

const mongodb = 'mongodb://localhost:27017/meanApp';

const getImage = require('path').join(__dirname,'/images');

mongoose.connect(mongodb, {useNewUrlParser: true}).then(() => {
  console.log("CONNECTED.")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(getImage)); 

//app.use(express.static(path.join(__dirname, '../meanApp/dist/meanApp'))); this is for displaying app in localhost3000


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);


module.exports = app;