const mongoose = require("mongoose");

const clanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    clanName: String,
    players: {
        userID: String,
        name: String,
    },
    points: { type: Number, default: 1500 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    last_result: [],
    result_history: [],
});

module.exports = mongoose.model("Clan", clanSchema);