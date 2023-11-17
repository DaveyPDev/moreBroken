/** Application for bank.ly */

const express = require('express');
const app = express();
const ExpressError = require("./helpers/expressError");

app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello, this is the root route!');
});

app.get('/ws', (req, res) => {
  console.log('Received a request to /ws');
  res.send('Hello, this is the /ws route!');
});

/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError(`Not Found: ${req.originalUrl}`, 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const status = err.status || 500;
  const message = err.message || 'Something went wrong. Please try again later.';
  return res.status(status).json({ message });
});

module.exports = app;


//* BUG #6 ** //
//# Removed Second module.exports = app; from the bottom of the file
//# This caused the app to not be exported properly
// module.exports = app;
