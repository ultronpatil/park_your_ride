const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

router.post('/saverecipt', async (req, res, next) => {
    const userId = req.params.userId;
    const paymentReceiptData = req.body;

    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            return next(error);
        }

        // Add the new payment receipt data to the user's receipts array
        user.pdfReceipts.push(paymentReceiptData);
        await user.save();

        res.json({ message: 'Payment receipt saved successfully' });
    } catch (error) {
        console.error('Error saving payment receipt:', error);
        next(error);
    }
});

module.exports = router;
