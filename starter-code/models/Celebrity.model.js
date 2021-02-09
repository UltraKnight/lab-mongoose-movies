const mongoose = require('mongoose');
const {Schema, model} = mongoose;

require('../configs/db.config');

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: String
    }
);

module.exports = model('Celebrity', celebritySchema);