'use strict';

const bodyParser = require('body-parser');
const path = require('path');
const chalk = require('colors');
const morgan = require('morgan');
const config = require('./config')

//middleware
// const auth = require('./authentication');

module.exports = function (app) {
  const env = config.get('environment');
  console.log(chalk.blue('Starting server in ' + env + ' environment'));

  //Setting application local variables
  app.locals.env = env;

 
  app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //Configure CORS handling
  require('./cors.js')(app);

  //SwaggerDoc Initialization
//   if (environment.isLocalhost() || environment.isDevelopment() ){
//     require('./swaggerConfig.js')(app);
//   }

  //Add Middleware to ensure that all requests to insecure port requests are redirected to secure port
  //This doesn't make much sense in development but allows two ports to be bound to an
  // elastic load balancer in production
//   app.use(redirectInsecureRequests);

  //Middleware function to redirect www to non www
//   app.use(redirectwwwToNonWWW)


  //Extend cache control headers to ensure that IE does not cache API requests
  app.use(function (req, res, next) {
    res.set('Expires', -1);
    next();
  });

//   app.use(auth.retrieveTokenAndAssociateUser);
  
  //Import all of the Mongo models
  require('./mongoose.js').initialise();

  //Import all of the routes
  require('./routes')(app);

  app.get('*', function (req, res) {
    res.status(404);
    res.send({ message: 'Unrecognised API Route' });
  });

  //Configure Error handling and page not found
  app.use(function (err, req, res, next) {
    // If the error object doesn't exists then there are no errors and we can continue
    if (!err) {
      return next();
    }

    console.error(chalk.red(err.stack));

    // if (environment.isProduction()) {
    //   res.status(500).send({
    //     error: 'An error occurred on the server',
    //     message: 'An error occurred on the server'
    //   });
    // } else {
    //   // We only respond with a stack trace if we are not in production
    //   res.status(500).send({
    //     error: err.stack,
    //     message: 'An error occurred on the server'
    //   });
    // }

  });
//   createListenerForUnhandledPromiseRejection()
};

