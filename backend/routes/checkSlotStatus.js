const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

// Endpoint to check the status of a parking slot
router.get('/checkSlotStatus/:slotNumber', async (req, res) => {
    try {
        const slotNumber = req.params.slotNumber;

        // Check if the slot is booked by any user
        const users = await User.find({ bookedSlots: slotNumber });

        // Check if the slot is currently occupied
        // You might have a separate logic to track the occupancy status of each slot
        const isOccupied = false; // Assuming not occupied for now

        if (users.length > 0) {
            res.status(200).json({ booked: true, occupied: isOccupied });
        } else {
            // res.status(200).json({ booked: false, occupied: isOccupied });
        }
    } catch (error) {
        console.error('Error checking slot status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
