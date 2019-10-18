const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    score: {
        type: Schema.Types.Number,
        required: true
    },
    photograph: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("scores", ScoreSchema);