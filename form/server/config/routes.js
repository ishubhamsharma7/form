'use strict';
const express = require('express');
const path = require('path');
const globArray = require('glob-array');
const colors = require('colors');

//This module loads all JavaScript file located under server/routes which have a .routes.js extension
module.exports = function(app) {
  console.log(colors.cyan('Load Server Routes files'));
  loadApiRoutes(app);
//   loadMobileRoutes(app, config);
};

function loadApiRoutes(app) {
  //Locate the routes files using the glob-array module
  const routesFiles = globArray.sync([path.join( __dirname,'../routes/*.routes.js')]);

  routesFiles.forEach(function(routePath) {
    console.log(colors.cyan('  ' + path.basename(routePath)));
    require(routePath)(app);
  });
}
