'use strict'

var Project = require('../models/project');

var controller = {
    home: (req,res)=>{
        return res.status(200).send({
            message: 'En la home'
        })
    },
    test: (req,res)=>{
        return res.status(200).send({
            message: 'Soy el metodo test'
        })
    },

    saveProject: (req, res)=>{
        var params = req.body;

        var project = new Project;

        project.name = params.nombre;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = null;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'No se ha podido guardar el documento'});

            if(!projectStored) return res.status(404).send({message: 'Error al guardar'});

            return res.status(200).send({projectStored})
        })
    },

    getProject: (req , res) =>{
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'el projecto no existe'});

        Project.findById(projectId,(err, project)=>{
            if(err) return res.status(500).send({message: 'error al devolver los datos'});

            if(!project) return res.status(404).send({message: 'el projecto no existe'});

            return res.status(200).send({project})
        })
    },

    getProjects: (req,res) =>{

        Project.find({}).sort('-year').exec((err, projects)=>{
            if(err) return res.status(500).send({message: 'error al devolver los projectos'});

            if(!projects) return res.status(404).send({message: 'No hay projectos para listar'});

            return res.status(200).send({projects});
        })

    },

    updateProject: (req,res) =>{
        var projectId = req.params.id;
        var update = req.body;

        if(projectId == null) return res.status(404).send({message: 'No hay projecto a actualizar'});

        Project.findByIdAndUpdate(projectId, update,{new: true}, (err, projectupdate) =>{
            if(err) return res.status(500).send({message: 'No se pudo actualizar'});

            if(!projectupdate) return res.status(404).send({message: 'No hay projecto a actualizar'});

            return res.status(200).send({project: projectupdate});
        })
    },

    deleteProject: (req ,res) =>{
        var projectId = req.params.id;
        if(projectId == null) return res.status(404).send({message: 'No hay projecto para borrar'});

        Project.findByIdAndDelete(projectId, (err, projectDeleted)=>{
            if(err) return res.status(500).send({message: 'Error al  borrar'});

            if(!projectDeleted) return res.status(404).send({message: 'No se pudo borrar el projecto'});

            return res.status(200).send({project: projectDeleted})
        })
    }
}

module.exports = controller;