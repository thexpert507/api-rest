'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProjectSchema = new schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String,
});

module.exports = mongoose.model('project', ProjectSchema);