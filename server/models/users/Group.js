const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created_on: {
        type: Schema.Types.Date,
        default: Date.now
    },
    last_edited_by: {
        type: Schema.Types.ObjectId,
        required: false
    },
    last_edited_on: {
        type: Schema.Types.Date,
        required: false
    },
    members: {
        type: Schema.Types.Array,
        required: false
    }
});