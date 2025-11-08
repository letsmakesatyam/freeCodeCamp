import express from 'express';
import  {getAllNotes, postANote , updateANote , deleteANote, getANoteById}  from '../controllers/notesController.js';
const router = express.Router();
router.get("/", getAllNotes);
router.get("/:id", getANoteById);
router.post("/", postANote);
router.put("/:id", updateANote);     
router.delete("/:id", deleteANote);
export default router;
/*
app.get('/api/notes', (req, res)=>{
    res.status(200).send("you got 5 notes");
})
app.post('/api/notes', (req, res)=>{
    res.status(201).send("you have posted a note");
})
app.put('/api/notes', (req, res)=>{
    res.status(200).send("you have updated a note");
})
app.delete('/api/notes', (req, res)=>{
    res.status(200).send("you have deleted a note");
})*/