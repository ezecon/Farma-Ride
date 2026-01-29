const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    buyerId: { 
        type: String, 
        required: true 
    },
    productId: { 
        type: String, 
        required: true 
    },
    quantity:{
        type: Number,
        required: true,
    },
    medicineName:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    singlePrice:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now

    }

});

module.exports = mongoose.model('Cart', cartSchema);
