// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create User Schema
const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
