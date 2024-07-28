const express = require('express');
const multer = require('multer');
const path = require('path');
const Medicine = require('../models/Medicine');

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
}).single('file');

// Route to add a new medicine
router.post('/add-medicine', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send({ msg: err });
    } else {
      const { medicineName, description, price, status } = req.body;
      const filename = req.file ? req.file.filename : null;

      const newMedicine = new Medicine({
        medicineName,
        description,
        price,
        status,
        filename,
      });

      try {
        await newMedicine.save();
        res.send({ msg: 'Medicine added successfully', medicine: newMedicine });
      } catch (err) {
        res.status(500).send({ msg: 'Database error', err });
      }
    }
  });
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
  
// Export router
module.exports = router;
