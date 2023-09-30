const database = require('../config/database.js');


const CountrySchema = new database.Schema({
  name: String,
});


CountrySchema.statics.getCountryAndState = getCountryAndState;
database.addModel('Country', CountrySchema, 'country');
const Country = database.getModel('Country');


function getCountryAndState(){
  return Country.find({})
}



