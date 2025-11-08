import Note from "../models/Note.js";

export const getAllNotes = async(req, res) => {
    try{
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    }
    catch(err){
        console.error("Error fetching notes:", err);
        res.status(500).send("Internal Server Error");
    }  // ← This closing brace was there
}  // ← But you're missing THIS closing brace for the function!

export const getANoteById = async(req, res) => {
    try{
        const { id } = req.params;
        const note = await Note.findById(id);
        
        if(!note){
            return res.status(404).json({ error: "Note not found" });
        }   
        res.status(200).json(note);
    }       
    catch(err){
        console.error("Error fetching note by ID:", err);
        res.status(500).send("Internal Server Error");
    }       

}

export const postANote = async(req, res) => {
    try{
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch(err){
        console.error("Error creating note:", err);
        res.status(500).send("Internal Server Error");
    }
}

export const updateANote = async(req, res) => {
    try{
        const { id } = req.params;  // Get note ID from URL
        const { title, content } = req.body;  // Get updated data
        
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }  // Return updated doc & validate
        );
        
        if(!updatedNote){
            return res.status(404).json({ error: "Note not found" });
        }
        
        res.status(200).json(updatedNote);
    }
    catch(err){
        console.error("Error updating note:", err);
        res.status(500).send("Internal Server Error");
    }
}   

export const deleteANote = async(req, res) => {
    try{
        const { id } = req.params;
        
        const deletedNote = await Note.findByIdAndDelete(id);
        
        if(!deletedNote){
            return res.status(404).json({ error: "Note not found" });
        }
        
        res.status(200).json({ message: "Note deleted successfully", deletedNote });
    }
    catch(err){
        console.error("Error deleting note:", err);
        res.status(500).send("Internal Server Error");
    }
}