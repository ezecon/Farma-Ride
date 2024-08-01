const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

router.post('/add-cart', async (req, res) => {
  const { buyerId, ownerId, productId, medicineName, quantity, price, singlePrice } = req.body;

  const newCart = new Cart({
    buyerId,
    ownerId,
    productId,
    medicineName,
    quantity,
    price,
    singlePrice
  });

  try {
    await newCart.save();
    res.send({ msg: 'Added to cart successfully', cart: newCart });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Cart.find();
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

router.get('/buyer/:userId', async (req, res) => {
  try {
    const cart = await Cart.find({ buyerId: req.params.userId });
    res.status(200).json(cart);
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

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).send({ msg: 'Item not found in cart' });
    }
    res.status(200).send({ msg: 'Item removed successfully' });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cartItem = await Cart.deleteMany({buyerId: id});
    if (!cartItem) {
      return res.status(404).send({ msg: 'Item not found in cart' });
    }
    res.status(200).send({ msg: 'Item removed successfully' });
  } catch (err) {
    res.status(500).send({ msg: 'Database error', err });
  }
});

module.exports = router;
