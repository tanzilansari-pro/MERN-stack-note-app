import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        Content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Note = mongoose.model("Note", NoteSchema);
export default Note;
