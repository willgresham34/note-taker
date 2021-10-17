//Requires all needed consts
const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid');

//declares port value to deploy to heroku and set the app const to express
const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Reads JSON file with notes on it
fs.readFile('db/db.json',  (err) => err ? console.error(err) : console.log(`File read`))

//All paths that are needed
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes/', (req, res) => res.sendFile(path.join(__dirname, 'db/db.json')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));


app.delete('/api/notes/:id', (req, res) => {
    const ID = req.params.id
    fs.readFile('db/db.json', (err, data) => {
        if(err) {
            console.error(err)
        }
        const notesJSON = JSON.parse(data) 
        const filterNotes = notesJSON.filter(function(idCheck){
            return idCheck !== ID
        })
        fs.writeFile('db/db.json', JSON.stringify(filterNotes), (err) => err ? console.error(err) : console.log(`Deleted`))  
    })
})

app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if(err) {
            console.error(err)
        }
        let newNote = `[{"title":"${req.body.title}","text":"${req.body.text}" "id": "${uuid}"}]`

        if (newNote includes('{'))
    })
})


// Shows where website is listed at and gives local link
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`));