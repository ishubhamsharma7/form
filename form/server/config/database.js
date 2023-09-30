'use strict';

const config = require('./config');
const chalk = require('colors');
const mongoose = require('mongoose');
const promise = require('bluebird');
require('dotenv').config();


promise.promisifyAll(mongoose);

const connectionString = config.get('dbServer') /*+ config.get('db')*/;
// Commented Mongoose Options as these options are not required in new mongoose version 6.2
// setMongooseOptions()
const connection = mongoose.createConnection(connectionString);
connection.on('error', function() {
  console.error(chalk.red('Mongo database connection error when connecting to ' + connectionString + '...'));
});
connection.once('open', function() {
  console.log(chalk.green('Mongo database connection opened for: ' + connectionString));
});

//Turning strict query off so to consider keys not defined in our schema.
// https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict

mongoose.set('strictQuery', false);

const ncubDevDbConnection = connection.useDb(config.get('db'));

exports.addModel = addModel;
exports.getModel = getModel;
exports.Schema = mongoose.Schema;
exports.Types = mongoose.Types;
exports.clearModels = clearModels;

function clearModels() {
  connection.models = {};
  imageDbConnection.models = {};
  configDbConnection.models = {};
  ncubDevDbConnection.models = {};
}

function addModel(schemaName, schema, collectionName) {
  ncubDevDbConnection.model(schemaName, schema, collectionName);
}

function getModel(schemaName) {
  return ncubDevDbConnection.model(schemaName);
}

function addImageDbModel(schemaName, schema, collectionName) {
  imageDbConnection.model(schemaName, schema, collectionName);
}

function getImageDbModel(schemaName) {
  return imageDbConnection.model(schemaName);
}

function addConfigDbModel(schemaName, schema, collectionName) {
  configDbConnection.model(schemaName, schema, collectionName);
}

function getConfigDbModel(schemaName) {
  return configDbConnection.model(schemaName);
}

function setMongooseOptions() {
  // Setting mongoose options to avoid use of deprecated methods
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useUnifiedTopology', true);
}
