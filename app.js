var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Actual query
app.get('/api/directions/:location', function (req, res, next) {
  // console.log(req);
  console.log(req.params);
  location = req.params.location; // Maps to hospital
  position = JSON.parse(req.query.position);
  direction = req.query.direction;  //
  destination = JSON.parse(req.query.destination);

  var path = app.resolve(position[0], position[1], destination[0], destination[1], app.load_grid(location));

  res.json(path);
});


module.exports = app;
