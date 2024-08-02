const express = require('express');
const Purchase = require('../models/Purchase.js');

const router = express.Router();

router.post('/buy', async (req, res) => {
    const { buyerId, sellerIds, products, quantity, price, latitude, longitude, buyType } = req.body;

    const newPurchase = new Purchase({
        buyerId, sellerIds, products, quantity, price, latitude, longitude, buyType
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

router.get('/:id', async (req, res) => {
  try {
    const medicine = await Cart.findById(req.params.id);
    if (!medicine) {
      return res.status(404).send({ msg: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});
router.get('/user/:userId', async (req, res) => {
  try {
    const medicine = await Cart.find({buyerId: req.params.userId});
    if (!medicine) {
      return res.status(404).send({ msg: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});



router.put('/update/:id', async (req, res) => {
  const { quantity, price } = req.body;
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ msg: 'Item not found in cart' });
    }
    cartItem.quantity = quantity;
    cartItem.price = price;
    await cartItem.save();
    res.send({ msg: 'Quantity updated successfully', cartItem });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});


module.exports = router;
