
const database = require('../config/database.js');
const Country = database.getModel('Country');
const User = database.getModel('User')
const responseHelper = require('./helper/responseHelper.js')


exports.getCountryWithStates = getCountryWithStates;
exports.saveUser = saveUser;
exports.fetchUsers = fetchUsers;


async function saveUser(request,response,next) {
    const sendResponse = responseHelper.createResponseHandler(request, response);
    const handleError = responseHelper.createErrorHandler(request, response, next);
    
    let userDetails = request.body
    let user = await User.find({email: userDetails.email}).lean()

    if(user.length) return response.status(400).json({
        message:`user already exists`
    })

   return User.create(userDetails)
    .then(sendResponse)
    .catch(handleError)
}


async function fetchUsers(request,response,next) {
    const sendResponse = responseHelper.createResponseHandler(request, response);
    const handleError = responseHelper.createErrorHandler(request, response, next);
    
    
   let users = await User.find({})

   if(users.length == 0){ 
    response.status(404).json({
        message:`No Users in DB`
        })
    }
    response.status(200).json(users)
}


function getCountryWithStates(request,response,next) {
    const sendResponse = responseHelper.createResponseHandler(request, response);
    const handleError = responseHelper.createErrorHandler(request, response, next);
    
    return Country.getCountryAndState()
        .then(sendResponse)
        .catch(handleError);
}

