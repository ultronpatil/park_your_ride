// // routes/pdf.js

// const express = require('express');
// const router = express.Router();
// const User = require('../models/UserSchema');

// router.post('/saverecipt', async (req, res) => {
//     try {
//         const { userId, pdfData } = req.body;

//         // Find the user by ID
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Update the user document with the PDF data
//         user.pdfReceipt = pdfData;
//         await user.save();

//         res.status(200).json({ message: 'PDF receipt saved successfully' });
//     } catch (error) {
//         console.error('Error saving PDF receipt:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
// routes/pdf.js

const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

router.post('/saverecipt', async (req, res) => {
    try {
        const { userId, pdfData } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user document with the PDF data
        user.pdfReceipt = pdfData;
        await user.save();

        res.status(200).json({ message: 'PDF receipt saved successfully' });
    } catch (error) {
        console.error('Error saving PDF receipt:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
