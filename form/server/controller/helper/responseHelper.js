const errorHelper = require('./errorHelper');

exports.createResponseHandler = createResponseHandler;
exports.createErrorHandler = createErrorHandler

function createResponseHandler(request, response, statusCode) {
    return function (data) {
      if (data) {
        if (statusCode) {
          response.status(statusCode);
        }
        return response.send(data);
      }
      return response.status(404).send(buildErrorResponse(request, { message: 'Not found<<<responseHelper.js' }));
    };
  }
 

function createErrorHandler(request, response, next) {
    return function (error) {
        if (error) {
        let responseMessage = buildErrorResponse(request, error);
        if (error.type === errorHelper.VALIDATION_ERROR_KEY) {
            return response.status(400).send(responseMessage);
        } else if (error.type === errorHelper.NOT_FOUND_ERROR_KEY) {
            return response.status(404).send(responseMessage);
        } else if (error.type === errorHelper.DUPLICATE_ERROR_KEY) {
            return response.status(409).send(responseMessage);
        }else if (error.type === errorHelper.NOT_AUTHORIZED_ERROR_KEY) {
            return response.status(403).send(responseMessage);
        }else if (error.type === errorHelper.REQUEST_VALIDATION_ERROR_KEY) {
            return response.status(422).send(responseMessage);
        }else if (error.type === errorHelper.TOO_MANY_REQUESTS_ERROR_KEY) {
            return response.status(429).send(responseMessage);
        } else if (error.response?.status == 404) {
            return response.status(404).send(responseMessage);
        } else {
            return response.status(400).send({message:error.message});
        }
        }
    };
}

function buildErrorResponse(request, error) {
    if (error && error.type) {
      return { url: request.originalUrl, message: error.message, type: error.type };
    }
    return { url: request.originalUrl, message: error.message };
  }