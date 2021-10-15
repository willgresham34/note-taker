//Requires all needed consts
const fs = require('fs');
const express = require('express');
const path = require('path');
const uuid = require('uuid')

//declares port value to deploy to heroku and set the app const to express
const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//Reads JSON file with notes on it
fs.readFile('db/db.json',  (err) => err ? console.error(err) : console.log('Success!'))

//All paths that are needed
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/api/notes/', (req, res) => res.sendFile(path.join(__dirname, 'db/db.json')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));