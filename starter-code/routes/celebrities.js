const express = require('express');
const Celebrity = require('../models/Celebrity.model');
const router = express.Router();

router.get('/celebrities', async (req, res, next) => {
    try {
        let celebritiesDb = await Celebrity.find();
        res.render('celebrities/index', {celebrities : celebritiesDb});
    } catch (error) {
        next();
        return error;
    }
});

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new');
});

router.post('/celebrities', (req, res, next) => {
    let {name, occupation, catchPhrase} = req.body;
    let celebrity = new Celebrity({name, occupation, catchPhrase});
    celebrity.save( err => {
        if(err) {
            res.render('celebrities/new');
        } else {
            res.redirect('/celebrities');
        }
    });
});

router.post('/celebrities/:id/delete', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Celebrity.findByIdAndDelete(id);
        res.redirect('/celebrities');
    } catch (error) {
        next();
        return error;
    }
});

router.get('/celebrities/:id/edit', async (req, res, next) => {
    try {
        let celebrityInfo = await Celebrity.findById(req.params.id);
        res.render('celebrities/edit', {celebrity : celebrityInfo});
    } catch (error) {
        next();
        return error;
    }
});

router.post('/celebrities/:id', async (req, res, next) => {
    try {
        let {name, occupation, catchPhrase} = req.body;
        await Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase});
        res.redirect('/celebrities');
    } catch (error) {
        next();
        return error;
    }
});

router.get('/celebrities/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let celebrityDb = await Celebrity.findById(id);
        res.render('celebrities/show', {celebrity : celebrityDb});
    } catch (error) {
        next();
        return error;
    }
});

module.exports = router;