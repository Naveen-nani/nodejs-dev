const validator = require('validator');

const signUpDataValidation = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName ){
        throw new Error ('First Name and Last Name are required');
    } else if(!validator.isEmail(email)){
        throw new Error ('Enter a valid email address');
    } else if(!validator.isStrongPassword(password)){
        throw new Error ('Password is not strong enough');
    }
}

module.exports = {signUpDataValidation};