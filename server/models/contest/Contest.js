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
    photographs: {
        type: Schema.Types.Array,
        required: false
    }
});

module.exports = mongoose.model("contests", ContestSchema);