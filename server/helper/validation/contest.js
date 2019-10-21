const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = (contestName, createdBy, contestNewName = undefined) => {
    let errors = {};

    contestName = isEmpty(contestName) ? "" : contestName;
    createdBy = isEmpty(createdBy) ? "" : createdBy;

    if (validator.isEmpty(contestName)) {
        errors.contest_name = "contest name cannot be empty!";
    }

    if (validator.isEmpty(createdBy)) {
        errors.created_by = "contest creator identifier cannot be empty!"
    }

    if (undefined !== contestNewName) {
        contestNewName = isEmpty(contestNewName) ? "" : contestNewName;
        if (validator.isEmpty(contestNewName)) {
            errors.new_contest_name = contestNewName;
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};