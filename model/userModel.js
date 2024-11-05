const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    clerk_id: { type: String },
    email: { type: String, required: true, unique: true },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // list of blocked users
    image: { type: String, default: "https://www.gravatar.com/avatar/?d=mp" }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
