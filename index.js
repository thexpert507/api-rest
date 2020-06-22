'use strict'

//Conectar a base de Datos
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
.then(()=>{
    console.log('Conectado a base de datos');

    //creacion del servidor
    app.listen(port ,() =>{
        console.log('servidor corriendo el localhost : 3700')
    })
})
.catch((err) => console.log(err))