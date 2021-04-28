'use strict';

// 3RD PARTY RESOURCES
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); //counts how long it takes to complete

//ESOTERIC RESOURCES
const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routes.js');

//prepare the express app
const app = express();

//APP LEVEL MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use(authRoutes);

//CATCHALLS
app.use(notFound);
app.use(errorHandler);



module.exports = {
  server: app,
  start: (port) => { //we aint runnin no start up. just start it
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};