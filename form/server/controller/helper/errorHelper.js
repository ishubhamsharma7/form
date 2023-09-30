'use strict';

const VALIDATION_ERROR_KEY = 'Validation Error';
const REQUEST_VALIDATION_ERROR_KEY = 'Request Validation error';
const DUPLICATE_ERROR_KEY = 'Duplicate Error';
const NOT_FOUND_ERROR_KEY = 'Not Found Error';
const NOT_AUTHORIZED_ERROR_KEY= 'Not Authorized Error';
const TOO_MANY_REQUESTS_ERROR_KEY = 'Too many requests';
const INVALID_MONGO_ID = 'Invalid MongoId'
const _ = require('lodash');

exports.VALIDATION_ERROR_KEY = VALIDATION_ERROR_KEY;
exports.REQUEST_VALIDATION_ERROR_KEY = REQUEST_VALIDATION_ERROR_KEY;
exports.DUPLICATE_ERROR_KEY = DUPLICATE_ERROR_KEY;
exports.NOT_FOUND_ERROR_KEY = NOT_FOUND_ERROR_KEY;
exports.wrapValidationError = wrapValidationError;
exports.wrapRequestValidationErrors = wrapRequestValidationErrors;
exports.NOT_AUTHORIZED_ERROR_KEY = NOT_AUTHORIZED_ERROR_KEY;
exports.TOO_MANY_REQUESTS_ERROR_KEY = TOO_MANY_REQUESTS_ERROR_KEY;
exports.INVALID_MONGO_ID = INVALID_MONGO_ID;
exports.isJavascriptError = isJavascriptError;
exports.notFoundResponseContent = notFoundResponseContent;
exports.notAuthorizedResponseContent = notAuthorizedResponseContent;

/**
 * ValidateJS wrapErrors method
 * This is the simplest form of a wrap errors method that only takes
 * the errors object.
 * The errors object is decorated and returned as the validation result
 * @param errors the errors object to decorate
 * @returns errors the decorated errors object
 */
function wrapValidationError(errors) {
  let stringifiedErrorMessages = stringifyErrorMessages(errors);
  return {
    type: VALIDATION_ERROR_KEY,
    message: stringifiedErrorMessages
  };
}

function wrapRequestValidationErrors(errors) {
  return {
    type: REQUEST_VALIDATION_ERROR_KEY,
    message: _.head(errors)
  };
}

function stringifyErrorMessages(errors) {
  let message = '';
  return  _.map(errors, function(error) {
    return message + _.head(error);
  });
}


function isJavascriptError(error) {
  if (error instanceof EvalError)  return true;
  if (error instanceof SyntaxError) return true;
  if (error instanceof RangeError) return true;
  if (error instanceof ReferenceError) return true;
  if (error instanceof TypeError) return true;
  if (error instanceof URIError) return true;
  return false;
}

function notFoundResponseContent(response) {
  let notFoundResponse = {
    type: NOT_FOUND_ERROR_KEY,
    message: "Not found"
  }
  response.status(404);
  response.send(notFoundResponse);
}

function notAuthorizedResponseContent(response) {
  let notAuthorizeResponse = {
    type: NOT_AUTHORIZED_ERROR_KEY,
    message: "Not Authorized"
  }
  response.status(401);
  response.send(notAuthorizeResponse);
}