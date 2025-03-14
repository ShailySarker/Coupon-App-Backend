const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    ipAddress: { type: String, required: true, unique: true },
    lastClaimed: { type: Date, default: null },
});

const User = mongoose.model('User', userSchema);

module.exports = User;