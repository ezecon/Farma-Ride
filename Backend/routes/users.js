const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');

// Create a user
router.post('/register', async (req, res) => {
    const { name, email, password, number, verificationCode } = req.body;

    try {
        // Check for existing user with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            number,
            verificationCode,
            isVerified: false // Add this if it's part of your schema
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by email
router.get('/verify/:userEmail', async (req, res) => {
    try {
        const item = await reservation.find({ email: req.params.userEmail });
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
});

// Verify user by email
router.put('/verify', async (req, res) => {
    try {
        const { userEmail } = req.body;
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { isVerified: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
 