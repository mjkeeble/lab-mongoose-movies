const mongoose = require('mongoose');
const Celebrity = require("../models/celebrity");

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

Celebrity.insertMany(celebrities)
.then(data => {
    console.log(`Success! ${data.length} celebrities added to the collection`);
    mongoose.connection.close();
})
.catch(err => {
    console.log(err);
});
