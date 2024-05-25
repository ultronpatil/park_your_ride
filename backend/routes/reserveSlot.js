

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/authenticate');
const User = require('../models/UserSchema');
const { log } = require('console');

// Parse JSON and URL-encoded bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/reserveSlot', async (req, res) => {
    try {
        const { selectedSlots, email } = req.body; // Extracting selectedSlots and email from request body
        console.log(email);
        // Find the user with the given email
        const user = await User.findOne({ email });

        if (user) {
            // Check if the user already has booked slots, if not, initialize bookedSlots array
            if (!user.bookedSlots) {
                user.bookedSlots = [];
            }

            // Check if the selected slot is already booked by the user
            if (!user.bookedSlots.includes(selectedSlots)) {
                // Reserve the slot for the user
                user.bookedSlots.push(selectedSlots);
                user.slot_number = selectedSlots; // Update the slot_number in the user document
                await user.save(); // Save the changes to the user document
                res.status(200).json({ message: "Slot reserved successfully" });
            } else {
                res.status(400).json({ error: "Slot already booked by the user" });
            }
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error handling reserveSlot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const auth = require('../middleware/authenticate');
// const User = require('../models/UserSchema');
// const { log } = require('console');

// // Parse JSON and URL-encoded bodies
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.post('/reserveSlot', async (req, res) => {
//     try {
//         const { selectedSlots, email } = req.body;

//         // Split the selectedSlots string into an array
//         const slotsArray = selectedSlots.split(',').map(slot => slot.trim());

//         // Find the user with the given email
//         const user = await User.findOne({ email });

//         if (user) {
//             if (!user.bookedSlots) {
//                 user.bookedSlots = [];
//             }

//             // Check if the selected slot is already booked by the user
//             if (!user.bookedSlots.some(slot => slotsArray.includes(slot))) {
//                 // Reserve the slot for the user
//                 user.bookedSlots.push(...slotsArray);
//                 user.slot_number = slotsArray[0]; // Assuming only one slot is being reserved, set slot_number to the first slot
//                 await user.save();
//                 res.status(200).json({ message: "Slot reserved successfully" });
//             } else {
//                 res.status(400).json({ error: "Slot already booked by the user" });
//             }
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }

//     } catch (error) {
//         console.error("Error handling reserveSlot:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });


// module.exports = router;
