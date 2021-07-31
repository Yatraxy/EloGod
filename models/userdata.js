const mongoose = require("mongoose");

const userdataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: String,
    userID: String,
    points: Number,
    rank: String,
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    games: {type: Number, default: 0},
    wrate: Number,
});

module.exports = mongoose.model("Userdata", userdataSchema);