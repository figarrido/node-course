const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use('/dishes', require('./dishes'));
app.use('/promotions', require('./promotions'));
app.use('/leaderships', require('./leaderships'));

app.listen(port, hostname, function () {
  console.log('Running on http://' + hostname + ':' + port + '/');
});
