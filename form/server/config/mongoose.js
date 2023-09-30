'use strict';

const chalk = require('colors');
const path = require('path');
const globArray = require('glob-array');

exports.isValidId = isValidId;
exports.initialise = initialise;

function initialise() {
  registerSchemas();
}

function registerSchemas() {
  // We need to make sure that the root path is used as it is different depending on whether
  // the application is runner from server.js or from specApi.js
  const schemaPath = path.join(__dirname, '../models/' + '*.model.js');
  const mongoSchemas = globArray.sync([schemaPath]);

  console.log(chalk.cyan('Mongo Schemas :'));
  mongoSchemas.forEach(function(routePath) {
    console.log(chalk.cyan('  ' + path.basename(routePath)));
    require(routePath);
  });
}

function isValidId(id) {
  if(!id) {
    return false;
  }

  // TODO - Need to investigate better options for mongo id validation
  // Reference Link - https://stackoverflow.com/questions/13850819/can-i-determine-if-a-string-is-a-mongodb-objectid 

  // Cannot use mongoose.Types.ObjectId.isValid(id) as this just looks for 12 bytes - not
  // 12 hex bytes
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  }

  return false;
}