const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json');
const uniqueId = require('uniqid');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', (req, res) => res.json(savedNotes));

app.post('/api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uniqueId();
        console.log(newNote);

        savedNotes.push(newNote);
        res.json(newNote);
    }
);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));