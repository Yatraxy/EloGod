const mongoose = require("mongoose");

const banSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player: String,
    ban: Date,
    reason: [String],
});

module.exports = mongoose.model("Ban", banSchema);