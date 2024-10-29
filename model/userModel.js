const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // list of blocked users
    image: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
