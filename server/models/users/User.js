const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true,
        min: 6,
        max: 30
    },
    date: {
        type: Schema.Types.Date,
        default: Date.now
    }
});

module.exports = mongoose.model("users", UserSchema);