const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestSchema = new Schema({
    name: {
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
    photographs: {
        type: Schema.Types.Array,
        required: false
    }
});

module.exports = mongoose.model("contests", ContestSchema);