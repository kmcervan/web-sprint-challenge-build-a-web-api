// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');
const mw = require('../middleware/middleware');

// R (read) of CRUD, returns an array of actions
router.get('/', (req, res)=>{
    Actions.get()
    .then(actions =>{
        res.status(200).json(actions)
    })
    .catch(error =>{
        res.status(500).json('error cannot retrieve actions')
    })
})

// R (read) of CRUD, returns an action with the given ID
router.get('/:id', mw.checkActionId, (req, res)=>{
    res.json(req.actions)
})

// [POST] C of CRUD, create new action
router.post('/', mw.checkAction, (req,res)=>{
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        res.status(500).json('cannot create new action')
    })
})

// [PUT] U of CRUD, update action with specific id
router.put('/:id',mw.checkAction, mw.checkActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then( action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json('cannot update specific action')
    })
})

// [DELETE] D of CRUD, delete speific action through id
router.delete('/:id', mw.checkActionId, (req, res)=>{
    Actions.remove(req.params.id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error =>{
        res.status(500).json('cannot delete specific action')
    })
})


module.exports = router;