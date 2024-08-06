const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../Cloudinary.js');


// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a user 
router.post('/register', async (req, res) => {
    const { name, email, password, number, role, verificationCode } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            number,
            verificationCode,
            role,
            isVerified: false
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

// Get users by role
router.get('/farmacy', async (req, res) => {
    try {
        const users = await User.find({ role: 'farmacy-owner' });
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

// Verify user by email
router.get('/verify/:userEmail', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.userEmail });
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

// Update verification status
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

// Update user by email (without photo)
router.put('/update', upload.single('photo'), async (req, res) => {
    const { 
        email, 
        division,
        upazilas,
        zipCode,
        district,
        country,
        latitude,
        longitude
    } = req.body;

    let photoUrl = null;

    try {
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        // Handle photo upload if present
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(req.file.buffer);
            });

            photoUrl = result.secure_url;
        }

        const updateData = {
            division,
            upazilas,
            zipCode,
            district,
            country,
            latitude,
            longitude
        };

        if (photoUrl) {
            updateData.photo = photoUrl;
        }

        const updatedUser = await User.findOneAndUpdate({ email }, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});



router.put('/profile/:id', upload.single('photo'), async (req, res) => {
    try {
        const { name, email, number, city, zipCode, district, country, latitude, longitude } = req.body;
        let photoUrl = null;

        // Find the user and update profile
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        // Upload photo to Cloudinary if present
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }).end(req.file.buffer);
            });

            photoUrl = result.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.number = number || user.number;
        user.city = city || user.city;
        user.zipCode = zipCode || user.zipCode;
        user.district = district || user.district;
        user.country = country || user.country;
        user.latitude = latitude || user.latitude;
        user.longitude = longitude || user.longitude;

        if (photoUrl) {
            user.photo = photoUrl;
        }

        await user.save();
        res.send({ success: true, msg: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Error during profile update:', err);
        res.status(500).send({ success: false, msg: 'Database error', err });
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
