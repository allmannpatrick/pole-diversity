//environment variables
require('dotenv').config();

// Common modules
const path = require('path');

// MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Initializing Express
const express = require('express'),
      app = express(),
      port = process.env.PORT;



//Middlewares
const compression = require('compression');
app.use(compression());

const helmet = require('helmet');
app.use(helmet());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//permission to serve static files
app.use(express.static(path.join('public')));

// View engine
app.set('views', path.join('views'));
app.set('view engine', 'pug');


//Routers
app.use('/', require('./routes/index'));
app.use('/', require('./routes/blog'));


const createError = require('http-errors');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => console.log(`pdApp listening on port ${port}!`));
