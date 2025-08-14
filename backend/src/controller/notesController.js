import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({updatedAt:-1});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const oneNote = await Note.findById(req.params.id);
    res.status(200).json(oneNote)
    if(!oneNote) return res.status(404).json({message:'Note not found'})
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error);
  }
};

export const postNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(200).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error);
  }
};

export const putNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Noted not found" });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error);
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error ", error);
  }
};
