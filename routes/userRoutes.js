const express = require("express");
const User = require("../model/userModel");

const { clerkClient, requireAuth } = require("@clerk/express");
const userModel = require("../model/userModel");

const router = express.Router();

// requireAuth will protect the route
router.get("/create", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const existUser = await userModel.findOne({ clerk_id: userId });
        if (!existUser) {
            const user = await clerkClient.users.getUser(userId);
            const newUser = new userModel({
                firstName: user?.firstName,
                lastName: user?.lastName,
                email: user?.emailAddresses[0]?.emailAddress,
                image: user?.imageUrl,
                clerk_id: user?.id
            });
            newUser.save();

            res.status(201).json({ message: "Successfully created user", data: newUser });
        }
        else {
            res.status(201).json({ message: "Already created", data: existUser });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

router.post("/search", requireAuth(), async (req, res) => {
    try {
        const results = await userModel.find({
            $or: [
                { firstName: { $regex: req.body.userData, $options: 'i' } },
                { lastName: { $regex: req.body.userData, $options: 'i' } },
                { email: { $regex: req.body.userData, $options: 'i' } }
            ]
        })
            .limit(5); // Limit the results to 5
        if (results) {
            res.status(201).json({ data: results });
        }
        else {
            res.status(201).json({ message: "No user found" });
        }

    } catch (error) {
        res.status(500).json({ error: 'Failed to search user' });
    }
})

module.exports = router;