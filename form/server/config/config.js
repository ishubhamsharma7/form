'use strict';

var convict = require('convict');

var conf = convict({
    environment: {
        doc: 'The application environment',
        format: ['production', 'staging', 'development', 'integrationTest', 'localhost'],
        default: 'localhost',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The application server port',
        format: '*',
        default: '5000'
    },
    dbServer: {
        doc: 'The Mongo Database Server',
        format: '*',
        default: 'mongodb://localhost/demo'
    },
    db: {
        doc: 'The Mongo Database Name',
        format: '*',
        default: 'demo'
    },
    corsOrigin: {
        doc: 'The CORS Allow Origin Header value. * allows all origins while a string ' +
            'will restrict to origins that contain that string.',
        format: '*',
        default: 'localhost'
    }
})

var environment = conf.get('environment');
conf.loadFile('./config/environment/' + environment + '.json');

module.exports = conf;
