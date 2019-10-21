const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (contestName, createdBy) => {
    let errors = {};

    contestName = isEmpty(contestName) ? "" : contestName;
    createdBy = isEmpty(createdBy) ? "" : createdBy;

    if (validator.isEmpty(contestName)) {
        errors.contest_name = "contest name cannot be empty!";
    }

    if (validator.isEmpty(createdBy)) {
        errors.created_by = "contest creator identifier cannot be empty!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};