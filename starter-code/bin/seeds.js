const mongoose = require('mongoose');
const Celebrity = require("../models/celebrity");
const Movie = require('../models/movie');

mongoose.connect('mongodb://localhost/movies', {
    useNewUrlParser: true
});

const celebrities = [
    {
        name: "Daniel Craig",
        occupation: "Actor",
        catchPhrase: "The name's Craig, Daniel Craig"
    },
    {
        name: "Paris Hilton",
        occupation: "Occupation? Seriously?",
        catchPhrase: ""
    },
    {
        name: "Donald Trump",
        occupation: "Egomaniac",
        catchPhrase: "Everybody loves, I\'m the lovabliest person in the whole world"
    }
];

const seedFilm ={
title: 'Staying Home'
}

Celebrity.insertMany(celebrities)
.then(data => {
    console.log(`Success! ${data.length} celebrities added to the collection`);
    // mongoose.connection.close();
})
.catch(err => {
    console.log(err);
});

Movie.create(seedFilm)
.then (data => {
    console.log(`film added to collection`);
})
.catch(err => {
    console.log(err);
});