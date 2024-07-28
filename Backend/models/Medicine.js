const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  medicineName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, required: true },
  filename: { type: String }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
