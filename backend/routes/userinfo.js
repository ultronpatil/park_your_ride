const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, async (req, res) => {
    try {
        // Fetch user details based on the user ID stored in req.userID
        const user = await User.findById(req.userID).select('name email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user information to the frontend
        res.json({ user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
