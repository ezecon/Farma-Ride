const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    buyerId: { 
        type: String, 
        required: true 
    },
    sellerIds: { 
        type: [String], 
        required: true 
    },
    products: { 
        type: [String], 
        required: true 
    }, 
    latitude:{
        type: String,
    },
    longitude:{
        type: String,
    },
    buyType:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: "Pending",
    },
    price:{
        type: [Number],
        required: true
    },
    quantity:{
        type: [Number],
        required: true
    },
    date:{
        type: Date,
        default: Date.now

    }

});

module.exports = mongoose.model('Purchase', purchaseSchema);
