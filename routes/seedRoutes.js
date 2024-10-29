const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Chat = require('../model/chatModel');
const Message = require('../model/messageModel');

// Seed users
router.post('/users', async (req, res) => {
    try {
        const users = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Charlie', email: 'charlie@example.com' },
        ];

        await User.insertMany(users);
        res.status(201).json({ message: 'Users seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to seed users' });
    }
});

// Seed chats
router.post('/chats', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length < 3) {
            return res.status(400).json({ error: 'Not enough users to create chats' });
        }

        const oneOnOneChat = new Chat({
            isGroupChat: false,
            users: [users[0]._id, users[1]._id],
        });

        const groupChat = new Chat({
            isGroupChat: true,
            users: [users[0]._id, users[1]._id, users[2]._id],
            name: 'Friends Group',
            groupAdmin: users[0]._id,
        });

        await oneOnOneChat.save();
        await groupChat.save();

        res.status(201).json({ message: 'Chats seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to seed chats' });
    }
});

// Seed messages
router.post('/messages', async (req, res) => {
    try {
        const chats = await Chat.find();
        const users = await User.find();

        if (chats.length < 2 || users.length < 3) {
            return res.status(400).json({ error: 'Not enough data to seed messages' });
        }

        const messages = [
            { chat: chats[0]._id, sender: users[0]._id, content: 'Hello Bob!' },
            { chat: chats[0]._id, sender: users[1]._id, content: 'Hey Alice!' },
            { chat: chats[1]._id, sender: users[0]._id, content: 'Welcome to the group chat!' },
            { chat: chats[1]._id, sender: users[2]._id, content: 'Glad to be here!' },
        ];

        await Message.insertMany(messages);
        res.status(201).json({ message: 'Messages seeded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to seed messages' });
    }
});

// Clear all data (Optional for testing purposes)
router.delete('/clear', async (req, res) => {
    try {
        await User.deleteMany({});
        await Chat.deleteMany({});
        await Message.deleteMany({});
        res.status(200).json({ message: 'All data cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear data' });
    }
});

module.exports = router;
