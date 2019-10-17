const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    user: {
        type: Array[Object],
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    photograph: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model("scores", ScoreSchema);