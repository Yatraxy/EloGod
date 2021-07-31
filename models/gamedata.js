const mongoose = require("mongoose");

const gamedataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gamenumber: Number,
    channelname: String,
    players: [String],
    team1: [String],
    team2: [String],
});

module.exports = mongoose.model("Gamedata", gamedataSchema);