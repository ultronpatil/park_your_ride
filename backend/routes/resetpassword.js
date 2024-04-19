const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate'); // Import the authenticate middleware
const User = require("../models/UserSchema");

// POST route for resetting password
router.post('/reset-password', authenticate, async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Check if email, new password, and confirm password are provided
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "Please provide email, new password, and confirm password" });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if new password matches confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update user's password
        user.password = hashedPassword;
        user.conpassword = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
