const mongoose = require('mongoose');
const {Schema, model} = mongoose;

require('../configs/db.config');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        actors: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
    }
);

module.exports = model('Movie', movieSchema);