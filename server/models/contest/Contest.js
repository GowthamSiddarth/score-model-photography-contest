const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: Object,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("contests", ContestSchema);