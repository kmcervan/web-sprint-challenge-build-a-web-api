// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const mw = require('../middleware/middleware');

router.get('/', (req,res) =>{
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error =>{
        res.status(500).json(error.message)
    })
})

router.get('/:id', mw.checkProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', mw.checkProject, (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(error =>{
        res.status(500).json(error.message)
    })
})

router.put('/:id', mw.checkProject, mw.checkProjectId, (req, res)=>{
    Projects.update(req.params.id, req.body)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
})

router.delete('/:id', mw.checkProjectId, (req, res) =>{
    Projects.remove(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
})

router.get('/:id/actions', mw.checkProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error =>{
        res.status(500).json(error.message)
    })
})

module.exports = router;