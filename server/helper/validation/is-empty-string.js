const isEmpty = require('is-empty');
const validator = require('validator');

module.exports = (string, paramName) => {
    let errors = {};
    string = isEmpty(string) ? "" : string;

    if (validator.isEmpty(string)) {
        errors[paramName] = `${paramName} is empty!`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}