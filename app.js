//environment variables
require('dotenv').config();

// Common modules
const path = require('path');

// Initializing Express
const express = require('express'),
      app = express(),
      port = process.env.PORT;

//Middlewares
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//permission to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Routers
app.use('/', require('./routes/index'));
app.use('/', require('./routes/blog'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
