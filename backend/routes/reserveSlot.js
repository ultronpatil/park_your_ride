// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const User = require('../models/UserSchema');

// // Parse JSON and URL-encoded bodies
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

// router.post('/reserveSlot', async (req, res) => {
//     try {
//         console.log("Received request body:", req.body);

//         let { selectedSlots, email } = req.body;

//         // Ensure selectedSlots is a string
//         if (Array.isArray(selectedSlots)) {
//             selectedSlots = selectedSlots[0]; // Assuming you want the first element if it's an array
//         }

//         if (!selectedSlots || !email) {
//             console.error("Missing selectedSlots or email");
//             return res.status(400).json({ error: "Missing selectedSlots or email" });
//         }

//         // Find the user with the given email
//         const user = await User.findOne({ email });

//         if (user) {
//             if (!user.bookedSlots) {
//                 user.bookedSlots = [];
//             }

//             if (!user.bookedSlots.includes(selectedSlots)) {
//                 user.bookedSlots.push(selectedSlots);
//                 user.slot_number = selectedSlots;
//                 await user.save();

//                 console.log(`Reserving slot ${selectedSlots} for user ${email}`);

//                 // Schedule the removal of the slot after 1 minute
//                 setTimeout(async () => {
//                     try {
//                         const updatedUser = await User.findOneAndUpdate(
//                             { email },
//                             {
//                                 $pull: { bookedSlots: selectedSlots },
//                                 $set: { slot_number: null }
//                             },
//                             { new: true }
//                         );
//                         if (updatedUser) {
//                             console.log(`Slot ${selectedSlots} for user ${email} has been released`);
//                             console.log(`Updated bookedSlots: ${updatedUser.bookedSlots}`);
//                             console.log(`Updated slot_number: ${updatedUser.slot_number}`);
//                         } else {
//                             console.error("User not found during slot release");
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

        if (!selectedSlots || !email) {
            console.error("Missing selectedSlots or email");
            return res.status(400).json({ error: "Missing selectedSlots or email" });
        }

        if (!Array.isArray(selectedSlots)) {
            selectedSlots = [selectedSlots];
        }

        // Find the user with the given email
        const user = await User.findOne({ email });

        if (user) {
            if (!user.bookedSlots) {
                user.bookedSlots = [];
            }

            const newSlots = selectedSlots.filter(slot => !user.bookedSlots.includes(slot));

            if (newSlots.length === 0) {
                return res.status(400).json({ error: "All selected slots are already booked by the user" });
            }

            user.bookedSlots.push(...newSlots);
            await user.save();

            console.log(`Reserving slots ${newSlots.join(', ')} for user ${email}`);

            // Schedule the removal of the slots after 1 minute
            setTimeout(async () => {
                try {
                    const updatedUser = await User.findOneAndUpdate(
                        { email },
                        {
                            $pull: { bookedSlots: { $in: newSlots } }
                        },
                        { new: true }
                    );
                    if (updatedUser) {
                        console.log(`Slots ${newSlots.join(', ')} for user ${email} have been released`);
                        console.log(`Updated bookedSlots: ${updatedUser.bookedSlots}`);
                    } else {
                        console.error("User not found during slot release");
                    }
                } catch (error) {
                    console.error("Error removing reserved slots:", error);
                }
            }, 60000);

            res.status(200).json({ message: "Slots reserved successfully" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error handling reserveSlot:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
