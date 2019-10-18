const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (data) => {
    let errors = {};

    data.contestName = isEmpty(data.contestName) ? "" : data.contestName;
    data.createdBy = isEmpty(data.createdBy) ? "" : data.createdBy;

    if (validator.isEmpty(data.contestName)) {
        errors.contest_name = "contest name cannot be empty!";
    }

    if (validator.isEmpty(data.createdBy)) {
        errors.created_by = "contest creator identifier cannot be empty!"
    }

    return {
        errors,
        isValid: !isEmpty(errors)
    };
};