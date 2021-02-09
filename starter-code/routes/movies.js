const express = require('express');
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get('/movies', async (req, res, next) => {
    try {
        let moviesDb = await Movie.find();
        res.render('movies/index', {movies : moviesDb});
    } catch (error) {
        next();
        return error;
    }
});

router.get('/movies/new', async (req, res, next) => {
    let actorsFound = await Celebrity.find();
    res.render('movies/new', {actors : actorsFound});
});

router.post('/movies', (req, res, next) => {
    let {title, genre, plot, actors} = req.body;
    let movie = new Movie({title, genre, plot, actors});
    movie.save( err => {
        if(err) {
            res.render('movies/new');
        } else {
            res.redirect('/movies');
        }
    });
});

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Movie.findByIdAndDelete(id);
        res.redirect('/movies');
    } catch (error) {
        next();
        return error;
    }
});

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        let movieInfo = await Movie.findById(req.params.id).populate('actors');
        let actorsFound = await Celebrity.find();
        res.render('movies/edit', {movie : movieInfo, actors: actorsFound});
    } catch (error) {
        next();
        return error;
    }
});

router.post('/movies/:id', async (req, res, next) => {
    try {
        let {title, genre, plot, actors} = req.body;
        await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, actors});
        res.redirect('/movies');
    } catch (error) {
        next();
        return error;
    }
});

router.get('/movies/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let movieDb = await Movie.findById(id).populate('actors');
        res.render('movies/show', {movie : movieDb});
    } catch (error) {
        next();
        return error;
    }
});

module.exports = router;