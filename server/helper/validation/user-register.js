const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (name, email, password, confirm_password, group_name) => {
    let errors = {};

    name = isEmpty(name) ? "" : name;
    email = isEmpty(email) ? "" : email;
    password = isEmpty(password) ? "" : password;
    confirm_password = isEmpty(confirm_password) ? "" : confirm_password;
    group_name = isEmpty(group_name) ? "" : group_name;

    if (validator.isEmpty(name)) {
        errors.name = "Name is required";
    }

    if (validator.isEmpty(email)) {
        errors.email = "Name is required";
    } else if (!validator.isEmail(email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(password)) {
        errors.password = "Password is required";
    } else if (!validator.isLength(password, { min: 6, max: 30 })) {
        errors.password = "Password must be min of 6 chars and max of 30 chars";
    }

    if (validator.isEmpty(confirm_password)) {
        errors.confirm_password = "Confirm Password is required";
    } else if (!validator.isLength(confirm_password, { min: 6, max: 30 })) {
        errors.confirm_password = "Password must be min of 6 chars and max of 30 chars";
    }
    
    if (!isEmpty(password) && !isEmpty(confirm_password) && password !== confirm_password) {
        errors.password = errors.confirm_password = "Password and Confirm Password should be same";
    }

    if (validator.isEmpty(group_name)) {
        errors.group_name = "Group is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};