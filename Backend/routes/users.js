const express = require('express');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

const sendVerificationEmail = async (user, req, res) => {
    try {
        const verificationCode = crypto.randomBytes(20).toString('hex');
        user.verificationCode = verificationCode;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: user.email,
                pass: user.password
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: user.email,
            subject: 'Email Verification',
            text: `Your verification code is ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: error.toString() });
            }
            res.status(200).json({ message: 'Verification email sent' });
        });
    } catch (err) {
        console.error('Error in sendVerificationEmail:', err);
        res.status(500).json({ error: 'Failed to send verification email' });
    }
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        sendVerificationEmail(user, req, res);
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Server error during registration' });
    }
});

router.post('/verify', async (req, res) => {
    const { email, verificationCode } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        user.isVerified = true;
        user.verificationCode = null;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error('Error verifying email:', err.message);
        res.status(500).json({ error: 'Server error during email verification' });
    }
});

module.exports = router;
