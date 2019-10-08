const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (data) => {
    let errors = {};

    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be min of 6 chars and max of 30 chars";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}