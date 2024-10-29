const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String }, // for group name
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
