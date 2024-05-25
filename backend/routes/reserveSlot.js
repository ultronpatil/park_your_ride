const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/UserSchema');

// Parse JSON and URL-encoded bodies
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/reserveSlot', async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        let { selectedSlots, email } = req.body;

        // Ensure selectedSlots is a string
        if (Array.isArray(selectedSlots)) {
            selectedSlots = selectedSlots[0]; // Assuming you want the first element if it's an array
        }

        if (!selectedSlots || !email) {
            console.error("Missing selectedSlots or email");
            return res.status(400).json({ error: "Missing selectedSlots or email" });
        }

        // Find the user with the given email
        const user = await User.findOne({ email });

        if (user) {
            if (!user.bookedSlots) {
                user.bookedSlots = [];
            }

            if (!user.bookedSlots.includes(selectedSlots)) {
                user.bookedSlots.push(selectedSlots);
                user.slot_number = selectedSlots;
                await user.save();

                console.log(`Reserving slot ${selectedSlots} for user ${email}`);

                // Schedule the removal of the slot after 1 minute
                setTimeout(async () => {
                    try {
                        const updatedUser = await User.findOne({ email });
                        if (updatedUser) {
                            updatedUser.bookedSlots = updatedUser.bookedSlots.filter(slot => slot !== selectedSlots);
                            if (updatedUser.slot_number === selectedSlots) {
                                updatedUser.slot_number = null;
                            }
                            await updatedUser.save();
                            console.log(`Slot ${selectedSlots} for user ${email} has been released`);
                        }
                    } catch (error) {
                        console.error("Error removing reserved slot:", error);
                    }
                }, 60000);

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
// const User = require('../models/UserSchema');

// // Parse JSON and URL-encoded bodies
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.post('/reserveSlot', async (req, res) => {
//     try {
//         const { selectedSlots, email } = req.body; // Extracting selectedSlots and email from request body

//         // Find the user with the given email
//         const user = await User.findOne({ email });

//         if (user) {
//             // Check if the user already has booked slots, if not, initialize bookedSlots array
//             if (!user.bookedSlots) {
//                 user.bookedSlots = [];
//             }

//             // Check if the selected slot is already booked by the user
//             if (!user.bookedSlots.includes(selectedSlots)) {
//                 // Reserve the slot for the user
//                 user.bookedSlots.push(selectedSlots);
//                 user.slot_number = selectedSlots; // Update the slot_number in the user document
//                 await user.save(); // Save the changes to the user document

//                 // Schedule the removal of the slot after 1 minute (60000 milliseconds)
//                 setTimeout(async () => {
//                     try {
//                         const updatedUser = await User.findOne({ email });
//                         if (updatedUser) {
//                             updatedUser.bookedSlots = updatedUser.bookedSlots.filter(slot => slot !== selectedSlots);
//                             if (updatedUser.slot_number === selectedSlots) {
//                                 updatedUser.slot_number = null;
//                             }
//                             await updatedUser.save();
//                             console.log(`Slot ${selectedSlots} for user ${email} has been released`);
//                             console.log(`Updated bookedSlots: ${updatedUser.bookedSlots}`);
//                             console.log(`Updated slot_number: ${updatedUser.slot_number}`);
//                         }
//                     } catch (error) {
//                         console.error("Error removing reserved slot:", error);
//                     }
//                 }, 60000);

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
