// models/Note.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Note Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        default:"No Title",
        trim: true,
        maxlength: 100,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the updatedAt field before saving
noteSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create Note Model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
