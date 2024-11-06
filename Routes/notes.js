// routes/noteRoutes.js
const express = require('express');
const Note = require('../Models/Note'); // Import the Note model
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();

// Create a new note
router.post('/',fetchUser, async (req, res) => {
    try {
        req.body.userId = req.user.id
        // console.log(req.body);
        const newNote = new Note(req.body);
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all notes for a specific user
router.get('/user',fetchUser, async (req, res) => {
    try {
        const userId =  req.user.id

        const notes = await Note.find({ userId: userId });
        return  res.json(notes);
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
router.put('/:id',fetchUser, async (req, res) => {
    try {
        const isNote = await Note.findById(req.params.id)
        if(!isNote){
            return res.status(404).json({ error: 'Note not found' });
        }
        if(isNote.userId != req.user.id){
            return res.status(404).json({ error: "User not allowed to manupulate other notes "});
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found at time of update not' });
        }
        return res.status(200).json(updatedNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a note by ID
router.delete('/:id', fetchUser, async (req, res) => {
    try {
        const isNote = await Note.findById(req.params.id)
        if(!isNote){
            return res.status(404).json({ error: 'Note not found' });
        }
        if(isNote.userId != req.user.id){
            return res.status(404).json({ error: "User not allowed to delete other's notes "});
        }
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ error: 'Note not found at time of delete' });
        }
        return res.status(200).json({status: "success" , message : 'deleted successfully '});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
