const express = require("express");
const User = require("../model/userModel");

const router = express.Router();

router.post("/create", async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
})

module.exports = router;