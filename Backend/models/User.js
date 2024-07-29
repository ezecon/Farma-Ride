const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    number:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        default: ''
    },
    zipCode:{
        type: String,
        default: ''
    },
    district:{
        type: String,
        default: ''
    },
    country:{
        type: String,
        default: ''
    },
    city:{
        type: String,
        default: ''
    },
    latitude:{
        type: String,
        default: ''
    },
    longitude:{
        type: String,
        default: ''
    },
    photo:{
        type:String,
        default: ''
    }, 
    password: { 
        type: String, 
        required: true 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    verificationCode: { 
        type: String ,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
