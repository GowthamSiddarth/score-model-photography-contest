const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (data) => {
    let errors = {};

    data.name = isEmpty(data.name) ? "" : data.name;
    data.email = isEmpty(data.email) ? "" : data.email;
    data.password = isEmpty(data.password) ? "" : data.password;
    data.confirm_password = isEmpty(data.confirm_password) ? "" : data.confirm_password;

    if (validator.isEmpty(data.name)) {
        errors.name = "Name is required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Name is required";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } else if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be min of 6 chars and max of 30 chars";
    }

    if (validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = "Confirm Password is required";
    } else if (!validator.isLength(data.confirm_password, { min: 6, max: 30 })) {
        errors.confirm_password = "Password must be min of 6 chars and max of 30 chars";
    }
    
    if (!isEmpty(data.password) && !isEmpty(data.confirm_password) && data.password !== data.confirm_password) {
        errors.password = errors.confirm_password = "Password and Confirm Password should be same";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};