const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//forr uploading images 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload with Multer storage
const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Create a user
router.post('/register', async (req, res) => {
    const { name, email, password, number, role, verificationCode } = req.body;

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
            role,
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
router.get('/farmacy', async (req, res) => {
    try {
        const users = await User.find({role:'farmacy-owner'});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user by email
router.get('/verify/:userEmail', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.userEmail }); // Use query parameter for email
        if (user) {
            res.status(200).json({
                isVerified: user.isVerified,
                verificationCode: user.verificationCode
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Verify user by email
router.put('/verify', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = await User.findOneAndUpdate(
            { email },
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

// update user by email
router.put('/update', upload.single('photo'), async (req, res) => {
    const { email, city, zipCode, district, country, latitude, longitude } = req.body;
    const photo = req.file ? req.file.filename : null;

    try {
        // Validate the incoming data
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const updateData = {
            city,
            zipCode,
            district,
            country,
            latitude,
            longitude
        };

        if (photo) {
            updateData.photo = photo;
        }

        // Find and update the user
        const updatedUser = await User.findOneAndUpdate({ email: email }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Send success response
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Delete user by email
router.delete('/delete', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOneAndDelete({ email });

        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
