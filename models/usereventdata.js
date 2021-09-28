const mongoose = require("mongoose");

const usereventdataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nickname: String,
    userID: String,
    dctag: String,
});

module.exports = mongoose.model("Usereventdata", usereventdataSchema);