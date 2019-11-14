const bcrypt = require('bcryptjs');

const User = require('../../../../../../models/users/User');
const Group = require('../../../../../../models/users/Group');

const { messageResponse, objectResponse } = require('../../../../../../helper/response-entity/response-body');

const validateUserRegister = require('../../../../../../helper/validation/user-register');

const responseCode = require('../../../../../../config/response-codes');

const register = (name, email, password, confirm_password, group_name) => {
    return new Promise((resolve, reject) => {
        let { errors, isValid } = validateUserRegister(name, email, password, confirm_password, group_name);

        if (!isValid) {
            return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
        }

        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.email = "email already registered!";
                return resolve(objectResponse(false, errors, responseCode.FOUR_HUNDRED));
            } else {
                Group.findOne({ name: group_name }).then(group => {
                    if (!group) return resolve(messageResponse(false, "Group Name not found!"));
                    const newUser = new User({
                        email: email,
                        name: name,
                        password: password,
                        my_groups: group._id
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) return reject(err);
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                return reject(err);
                            } else {
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => resolve(messageResponse(true, "User created")))
                                    .catch(err => resolve(messageResponse(false, "Internal Server Error!", responseCode.FIVE_HUNDRED)));
                            }
                        });
                    });
                })
            }
        });
    });

}

module.exports = register;