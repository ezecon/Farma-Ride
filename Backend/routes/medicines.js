const express = require('express');
const multer = require('multer');
const path = require('path');
const Medicine = require('../models/Medicine');

const router = express.Router();

const cloudinary = require('../Cloudinary.js');


// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
  

router.post('/add-medicine', upload.single('file'), async (req, res) => {
  const { owner, medicineName, description, price, status } = req.body;
  let photoUrl = null;

  try {
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

    // Create new medicine
    const newMedicine = new Medicine({
      owner,
      medicineName,
      description,
      price,
      status,
      filename: photoUrl, // Store the Cloudinary URL
    });

    await newMedicine.save();
    res.status(201).send({ msg: 'Medicine added successfully', medicine: newMedicine });
  } catch (err) {
    console.error('Error adding medicine:', err);
    res.status(500).send({ msg: 'Database error', err });
  }
});


// Get items of that owner
router.get('/owner/:owner', async (req, res) => {
  try {
    const medicines = await Medicine.find({ owner: req.params.owner });
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});



router.get('/', async (req, res) => {
    try {
      const medicines = await Medicine.find();
      res.status(200).json(medicines);
    } catch (err) {
      res.status(500).send({ msg: 'Database error', err });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
        return res.status(404).send({ msg: 'Medicine not found' });
      }
      res.json(medicine);
    } catch (err) {
      res.status(500).send({ msg: 'Database error', err });
    }
  });

  
  router.delete('/:id', async (req, res) => {
    try {
      const medicine = await Medicine.findByIdAndDelete(req.params.id);
      if (!medicine) {
        return res.status(404).send({ msg: 'Medicine not found' });
      }
      res.send({ msg: 'Medicine deleted successfully' });
    } catch (err) {
      res.status(500).send({ msg: 'Database error', err });
    }
  });
  
  router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
      const { medicineName, description, price, status } = req.body;
      let photoUrl = null;
  
      // Find the medicine by ID
      const medicine = await Medicine.findById(req.params.id);
      if (!medicine) {
        return res.status(404).send({ msg: 'Medicine not found' });
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
  
      // Update medicine details
      medicine.medicineName = medicineName || medicine.medicineName;
      medicine.description = description || medicine.description;
      medicine.price = price || medicine.price;
      medicine.status = status || medicine.status;
      if (photoUrl) {
        medicine.filename = photoUrl; // Ensure the field name is correct
      }
  
      // Save updated medicine
      await medicine.save();
      res.send({ msg: 'Medicine updated successfully', medicine });
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).send({ msg: 'Database error', err });
    }
  });
  
  
// Export router
module.exports = router;
