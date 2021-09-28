const mongoose = require("mongoose");

const gamedataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gamenumber: Number,
    channelname: String,
    players: Array,
    captains: Array,
    remplayers: Array,
    pick: {type: Boolean, default: true},
    captainpick: {type: Boolean, default: true},
    team1: Array,
    team2: Array,
    wteam: Array,
    lteam: Array,
    pmap: String,
    cancel: {type: Boolean, default: false},

});

module.exports = mongoose.model("Gamedata", gamedataSchema);