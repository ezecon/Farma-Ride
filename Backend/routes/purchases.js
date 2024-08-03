const express = require('express');
const Purchase = require('../models/Purchase.js');

const router = express.Router();

router.post('/buy', async (req, res) => {
    const { buyerId, sellerIds, products, quantity, price, latitude, longitude, buyType, division, district, upazilas } = req.body;

    const newPurchase = new Purchase({
        buyerId, sellerIds, products, quantity, price, latitude, longitude, buyType, division, district, upazilas
    });

    try { 
        await newPurchase.save();
        res.status(200).send({ msg: 'Added to purchase successfully', cart: newPurchase });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send({ msg: 'Database error' });
    }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Purchase.find();
    res.status(200).json(medicines);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

router.get('/dest1/:id', async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ buyerId: req.params.id });
    if (purchase) {
      const destination = { latitude: purchase.latitude, longitude: purchase.longitude }; // Ensure you have these fields
      res.status(200).json(destination);
    } else {
      res.status(404).send({ msg: 'Destination not found' });
    }
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const medicine = await Purchase.findById(req.params.id);
    if (!medicine) {
      return res.status(404).send({ msg: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});
router.get('/user/:userID', async (req, res) => {
  try {
    const purchases = await Purchase.find({ buyerId: req.params.userID });
    if (purchases.length === 0) {
      return res.status(404).send({ msg: 'No purchases found for this user' });
    }
    res.json(purchases);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});




router.put('/update/:id', async (req, res) => {
  try {
    const cartItem = await Purchase.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ msg: 'Cart item not found' });
    }
    cartItem.status = "Accepted!";
    await cartItem.save();
    res.status(200).send({ msg: 'Quantity updated successfully', cartItem });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});
router.put('/customer/update/:id', async (req, res) => {
  try {
    const cartItem = await Purchase.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ msg: 'Cart item not found' });
    }
    cartItem.status = "Delivered";
    await cartItem.save();
    res.status(200).send({ msg: 'Updated successfully', cartItem });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

router.put('/rider/update/:id', async (req, res) => {
  try {
    const {userID} = req.body;
    const cartItem = await Purchase.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ msg: 'Cart item not found' });
    }
    cartItem.status = "On the way";
    cartItem.rider = userID;
    await cartItem.save();
    res.status(200).send({ msg: 'Quantity updated successfully', cartItem });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

       

module.exports = router;
