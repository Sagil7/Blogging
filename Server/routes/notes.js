const express = require('express');
const Note = require('../modal/Notes');
const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator');


router.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
  });

  router.post('/notes', async (req, res) => {
    const note = new Note({
      title: req.body.title,
      content: req.body.content
    });
    await note.save();
    res.json(note);
  });
  router.put('/notes/:id', async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  });
  
  router.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  });


module.exports = router;