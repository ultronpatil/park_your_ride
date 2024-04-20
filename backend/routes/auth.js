const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../db/conn');
const User = require('../models/UserSchema');
const Feedback = require('../models/FeedbackSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from server router`);
});

router.post('/register', async (req, res) => {
    const { name, email, vehicle, phone, password, conpassword } = req.body;

    if (!name || !email || !phone || !vehicle || !password || !conpassword) {
        return res.status(422).json({ error: 'Fill all fields properly' });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: 'Email already exists' });
        } else if (password !== conpassword) {
            return res.status(422).json({ error: 'Passwords do not match' });
        } else {
            const user = new User({ name, email, phone, vehicle, password, conpassword });
            await user.save();
            res.status(201).json({ message: 'Registration successful' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Please fill all fields' });
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid Credentials' });
            }
            const token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
            });
            res.json({ message: 'Login successful' });
        } else {
            res.status(400).json({ error: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/profile', authenticate, (req, res) => {
    console.log(`hello from profile`);
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res) => {
    console.log(`hello from contact us`);
    res.send(req.rootUser);
});

router.post('/feedback', authenticate, async (req, res) => {
    const { name, email, message } = req.body;
    try {
        if (!name || !email || !message) {
            console.log('error in feedback');
            return res.json({ message: 'Error in feedback' });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const UserMessage = await userContact.addMessage(name, email, message);
            await userContact.save();
            res.status(201).json({ message: 'Feedback sent successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/logout', authenticate, async (req, res) => {
    try {
        const token = req.cookies.jwtoken;
        const user = await User.findOne({ _id: req.userID });
        if (user) {
            user.tokens = user.tokens.filter((t) => t.token !== token);
            await user.save();
        }
        res.clearCookie('jwtoken');
        res.status(200).json({ message: 'Logout successful' });
        // res.redirect('/login');
    } catch (err) {
        console.error(err);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
