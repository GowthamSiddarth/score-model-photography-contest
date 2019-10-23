const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotographSchema = new Schema({
    filename: {
        type: Schema.Types.String,
        required: true
    },
    submitted_by: {
        type: Schema.Types.ObjectId,
        required: true
    },
    submitted_on: {
        type: Schema.Types.Date,
        default: Date.now
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    contest_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    score_id: {
        type: Schema.Types.ObjectId,
        required: false
    }
});

module.exports = mongoose.model("photographs", PhotographSchema);