const express = require('express');
const stencil = require('@stencil/core/server');
const compression = require('compression');

// create the express app
const app = express();

app.use(compression());

// set which port express it will be using
const port = process.env.PORT || 3030;

// load the stencil config & init server-side rendering html pages
const config = stencil.initApp({
  app,
  configPath: __dirname,
});

// serve all static files from www directory
app.use(express.static(config.wwwDir));

// start the server
app.listen(port, () => config.logger.info(` 🍁 🍁 Stencil server started at http://localhost:${ port }`));
