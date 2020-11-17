const express = require('express');
const { findById } = require('../models/celebrity');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');

const router = express.Router();

router.get('/movies', (req, res) => {
    console.log('movies');
    Movie.find()
        .then(movies => {
            console.log("movies called");

            res.render("movies/index", { movie: movies });
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/movies/new', (req, res) => {
    Celebrity.find()
        .then(celebrity => {
            console.log(celebrity);
            res.render("movies/new", { celebrity });
        })
})

router.post("/movies/:id", (req, res) => {
    const { title, genre, plot, cast} = req.body;
    Movie.findByIdAndUpdate(req.params.id, {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })
        .then(() => {
            res.redirect("/movies")
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/movies/:id/delete", (req, res) => {
    Movie.findByIdAndDelete({ _id: req.params.id})
    .then(() => {
    res.redirect('/movies');
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/movies/edit/:id', (req, res) => {
    console.log(`edit`);
    Movie.findById(req.params.id)
        .then(movie => {
            console.log(movie);
            // How to populate cast selector?
            res.render('movies/edit', { movie });
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/movies/', (req, res) => {
    const { title, genre, plot, cast } = req.body;
    console.log(title, cast);
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
        .then(movie => {
            console.log(`${movie.title} was added`);
            res.redirect(`/movies`)
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/movies/:id', (req, res) => {
    Movie.findById(req.params.id).populate("cast")
        .then(movie => {
            console.log(movie);
            res.render("movies/show", { movie });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router;
