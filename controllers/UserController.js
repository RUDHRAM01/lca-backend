const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SendMail = require('../utils/NodeMailer');
const generateToken = require('../utils/Token');
require('dotenv').config();


const LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ token: generateToken(user,"30d") });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const RegisterUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        const token = generateToken(newUser);
        const nodemailerRes = await SendMail(req.body.username, token, 'login');
        if (nodemailerRes) {
            res.status(200).json({ message: 'Please verify your email!' });
        } else {
            res.status(500).json({ message: 'Something went wrong' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const VerifyUser = async (req, res) => {
    try {
        const verify = jwt.verify(req.query.id, process.env.LoginSecret);
        const user = await User.findById(verify.id);
        user.verified = true;
        await user.save();
        res.status(200).json({ message: 'User verified' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    LoginUser,
    RegisterUser,
    VerifyUser
}
