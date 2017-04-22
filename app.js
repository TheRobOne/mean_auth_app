const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to db
mongoose.db = connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to db ' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Db error ' + err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 3000;

// Cors Middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

//Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, ()=> {
  console.log("Server started on port " + port);
});
