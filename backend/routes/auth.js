const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const cookieParser = require("cookie-parser")
router.use(cookieParser())

require('../db/conn');
const User = require("../models/UserSchema");
const Feedback = require("../models/FeedbackSchema");

router.get('/', (req, res) => {
    res.send(`Hello world from server router`);
})

router.post('/register', async (req, res) => {
    const { name, email, vehicle, phone, password, conpassword } = req.body;

    if (!name || !email || !phone || !vehicle || !password || !conpassword) {
        return res.status(422).json({ error: "fill proper" })
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ message: "Email already exists" })
        }
        else if (password != conpassword) {
            return res.status(422).json({ message: "password are not matching" })
        }
        else {
            const user = new User({ name, email, phone, vehicle, password, conpassword })
            await user.save();

            res.status(201).json({ message: "Register successful" });

        }

    } catch (err) {
        console.log(err);
    }

});

router.post('/signin', async (req, res) => {
    try {

        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "plzz fill the data" })
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });


            if (!isMatch) {
                res.status(400).json({ error: "user login failed(pass)" })
            }
            else {
                res.json({ message: "Login successful" })
            }
        } else {
            res.status(400).json({ error: "user login failed(email)" })
        }

    } catch (err) {
        console.log(err);
    }
});


router.get('/profile', authenticate, (req, res) => {
    console.log(`hello from profile`);
    res.send(req.rootUser)
});

router.get('/getdata', authenticate, (req, res) => {
    console.log(`hello from contact us`);
    res.send(req.rootUser)
});

router.post('/feedback', authenticate, async (req, res) => {
    const { name, email, message } = req.body;

    try {


        if (!name || !email || !message) {
            console.log("error in feedback");
            return res.json({ message: "error" });
        }

        // const feedback = new Feedback({ name, email, message })
        // await feedback.save();
        // res.status(201).json({ message: "feedback has sent" });

        const userContact = await User.findOne({ _id: req.userID })
        if (userContact) {
            const UserMessage = await userContact.addMessage(name, email, message);
            await userContact.save();
            res.status(201).json({ message: "feedback success" });
        }

    } catch (error) {
        console.log(error);
    }

});


module.exports = router;