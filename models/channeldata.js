const mongoose = require("mongoose");

const channeldataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelname: String,
    teamyes: Boolean,
    multiplier: Number,
    maps: [String],
    pickmode: Number,
    playerPT: Number,
    playerIQ: [String],
    playerIQN: {type: Number, default: 0},
    captainPO: Number,
    readyannchannel: String,
    resultannchannel: String,
    gamenb: Number,
    picking: {type: Boolean, default: false},
});

module.exports = mongoose.model("Channeldata", channeldataSchema);