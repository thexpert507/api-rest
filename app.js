'use strict'
var express = require('express')
var bodyparser = require('body-parser')

var app = express();

//archivos de rutas
var project_routes = require('./routes/project');


//midlewares ...se ejecuta antes de contraloador
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//cors
//rutas
app.use('/', project_routes);

module.exports = app;