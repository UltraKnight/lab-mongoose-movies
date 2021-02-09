require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const helpers      = require('handlebars-helpers');

hbs.registerHelper(helpers());

//custom helper to see if the value of a property name is inside an array of objects
//use from movies views
hbs.registerHelper('ifIn', function(name, arr, options) {
  if(arr.find(elem => elem.name === name)) {
    return options.fn(this);
  }
  return options.inverse(this);
});

require('./configs/db.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Muviez';

const index = require('./routes/index');
app.use('/', index);

const celebrity = require('./routes/celebrities');
app.use('/', celebrity);

const movie = require('./routes/movies');
app.use('/', movie);

module.exports = app;
