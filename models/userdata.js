const mongoose = require("mongoose");

const userdataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: String,
    userID: String,
    points: { type: Number, default: 1500 },
    hiddenMMR: Number,
    rank: Number,
    rd: { type: Number, default: 350 },
    vol: { type: Number, default: 0.06 },
    rd2: { type: Number, default: 0 },
    points2: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    games: { type: Number, default: 0 },
    wrate: Number,
    last_result: [],
    result_history: [],
});

module.exports = mongoose.model("Userdata", userdataSchema);