import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Note from './models/Note.js';
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors())
app.use(express.json())

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(` App is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("DB connection error:", error);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/CreateNote', async (req, res) => {
    const { Name, Content } = req.body;

    if (!Name || !Content) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const newNote = await Note.create({ Name, Content });
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).send({ message: "Error creating note", error: err.message });
    }
});

app.get('/AllNotes', async (req, res) => {
    try {
        const Notes = await Note.find({})
        return res.status(200).json({
            count: Notes.length,
            data: Notes
        })
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/Notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id)
        return res.status(200).json(note)
    } catch (error) {
        console.log(error.message)
    }
})

app.put('/Notes/:id', async (req, res) => {
    const { Name, Content } = req.body;
    try {
        if (!Name || !Content) {
            res.status(401).send("All Fields are Required")
        }

        const { id } = req.params;

        const result = await Note.findByIdAndUpdate(id, req.body)

        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }

        return res.status(200).send("Book updated successfully")
    } catch (error) {
        console.log(error.message)
    }
})

app.delete('/Notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).send("Note not found");
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});
