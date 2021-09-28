const mongoose = require("mongoose");

const rankSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rolename: String,
    rankpos: Number,
    rolerank: String,
    starting: Number,
    ranklink: String,
});

module.exports = mongoose.model("Rank", rankSchema);