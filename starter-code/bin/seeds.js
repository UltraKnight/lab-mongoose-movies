const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

require('../configs/db.config');

const celebrities = [
    {name: 'Stwart Rockstar', occupation: 'none', catchPhrase: 'yeah!'},
    {name: 'Calleb Jason', occupation: 'sleeper', catchPhrase: 'do your...[zzz]'},
    {name: 'Gardner Gilberson', occupation: 'unknown', catchPhrase: 'kill them all!'}
];

const movies = [
    { title: 'Movie 1', genre: 'Horror', plot: 'nice movie', actors: []},
    { title: 'Movie 2', genre: 'Thriller', plot: 'everybody dies', actors: []},
    { title: 'Movie 3', genre: 'unknown', plot: 'nothing happens at all', actors: []}
];

async function createCelebrities() {
    try {
        await Celebrity.create(celebrities);
        console.log('Celebrities inserted');
        mongoose.connection.close();
    } catch (error) {
        console.log(`Error while inserting celebrities: ${error}`);
    }
}

async function createMovies() {
    try {
        await Movie.create(movies);
        console.log('Movies inserted');
        mongoose.connection.close();
    } catch (error) {
        console.log(`Error while inserting movies: ${error}`);
    }
}

//createCelebrities();
createMovies();