const express = require('express');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
const router = express.Router();


router.get('/celebrities', (req, res) => {
    console.log('celebrities');
    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/index", { celebrities });
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/celebrities/add', (req, res) => {
    console.log(req.params);
    res.render("celebrities/new");
})

router.get("/celebrities/edit/:id", (req, res) => {
    console.log(`called edit`);
    Celebrity.findById(req.params.id)
        .then(celebrity => {
            console.log(celebrity);
            res.render("celebrities/edit", { celebrity });
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/celebrities/:id", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/celebrities/:id/delete", (req, res) => {
    Celebrity.findByIdAndRemove({ _id: req.params.id })
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/celebrities/:id', (req, res) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId)
        .then(celebrity => {
            console.log(celebrity);
            res.render("celebrities/show", { celebrity });
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/celebrities", (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(name, occupation, catchPhrase);
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
        .then(celebrity => {
            console.log(`${celebrity.name} was added to the file!`);
            res.redirect(`/celebrities/${celebrity._id}`)
        })
        .catch(err => {
            res.redirect('/celebrities/new')
            console.log(err);
        })
})






module.exports = router;
