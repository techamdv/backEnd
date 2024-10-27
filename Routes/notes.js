// routes/noteRoutes.js
const express = require('express');
const Note = require('../Models/Note'); // Import the Note model
const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all notes for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.params.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific note by ID
router.get('/note/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
