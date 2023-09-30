
const config = require('./config');
const errorHelper = require('../controller/helper/errorHelper');

module.exports = configureCorsHeaders;

/**
 * Function to configure the CORS headers for the environment
 * The options for CORS headers are more restrictive than we would like as we want to serve multiple domains
 * https://konfer.online and https://www.konfer.online
 * The CORS specification should allow this but doesn't (see note in spec)
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
 * https://www.w3.org/TR/cors/#access-control-allow-origin-response-header
 *
 * This code inspects a config parameter to determine which origins are allowed. A '*' means any domain is allowed
 * and we should return a wildcard CORS header. For all other values we should inspect the origin of the request
 * and if it contains the domain specified then the origin of the request should be returned.
 *
 * @param app the app object to add the cors routes to
 */
function configureCorsHeaders(app) {
  app.all('/*', function (request, response, next) {
    // Added condition to block response when sent from unauthorised origins
    if (!getCorsOrigin(request)) {
      return sendUnauthorisedResponse(response);
    }

    response.header('Access-Control-Allow-Origin', getCorsOrigin(request));
    response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Api-Authorization, trackingId');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
}

function sendUnauthorisedResponse(response) {
    let responseContent = { type: errorHelper.NOT_AUTHORIZED_ERROR_KEY, message: 'Unauthorized Request' }
    response.status(403);
    response.send(responseContent);
  }
  
  function getCorsOrigin(request) {
    const configuredOrigin = config.get('corsOrigin');
    if (configuredOrigin === '*') {
      return configuredOrigin;
    } else {
      const requestOrigin = request.headers.origin;
  
      //Added below condition to allow access of share api for cross origin.
      if (request.path.includes('/api/share/')) return '*';
      if (request.path.includes('/doc')) return '*';
      if (request.path.includes('/opportunity/detail/')) return '*';
      if (request.path.includes('/funding/detail/')) return '*';
  
      if (requestOrigin && requestOrigin.indexOf(configuredOrigin) > -1) {
        return requestOrigin;
      }
      return null;
    }
  }