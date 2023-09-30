'use strict';
const path = require('path');
// const auth = require('../config/authentication');


module.exports = function (app) {
  const controller = require(path.join(__dirname, '../controller/user.controller.js'));

  app.route('/fetch/country').get(controller.getCountryWithStates);
  app.route('/save/user').post(controller.saveUser)
  app.route('/fetch/users').get(controller.fetchUsers);


};
