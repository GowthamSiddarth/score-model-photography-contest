const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (email, password) => {
    let errors = {};

    email = isEmpty(email) ? "" : email;
    password = isEmpty(password) ? "" : password;

    if (validator.isEmpty(email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be min of 6 chars and max of 30 chars";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}