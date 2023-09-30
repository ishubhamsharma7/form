const database = require('../config/database');


const UserSchema = new database.Schema({
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  email: { type: String, required: true, match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  age: Number,
  dateOfBirth:{type:String,required:true}
});

UserSchema.statics.saveUserInDB = saveUserInDB

database.addModel('User', UserSchema, 'user');
const User = database.getModel('User');



function saveUserInDB(){
  
}
