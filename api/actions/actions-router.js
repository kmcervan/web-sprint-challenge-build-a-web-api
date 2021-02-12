// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');
// const Projects = require('../projects/projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
    //returns an array of actions (or an empty array) as the body of the response
    //no middleware is needed here
    Actions.get(req.query)
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the action',
        });
    });
});

router.get('/api/actions/:id', mw.validateActionId, (req, res) => {
    //returns an action with the given id as the body of the response
    //this needs a middware to verify action id
    res.status(200).json(req.actions)
});
router.post('/api/actions/:id',mw.validateActionId, mw.validateAction, (req, res) => {
    //returns the newly created action as the body of the response
    //this needs a middleware to check that the request (body?) is valid
    const postInfo = {...req.body, project_id: 1};

    Actions.insert(postInfo)
    .then(actions => {
        res.status(201).json(actions);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding action'
        });
    });
});
router.put('/api/actions/:id', mw.validateActionId, (req, res) => {
    //returns the updated action as the body of the response
    //this needs a middleware to verify action id
    //and another middleware to check that the request (body?) is valid 
    Actions.update(req.params.id, req.body)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the action'
        })
    })
});
router.delete('/api/actions/:id', mw.validateActionId, (req, res) => {
    //returns no response body
    //this needs a middleware to verify action id
    Actions.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: 'the action has been deleted'});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error removing action'});
    });
});

//exporting the router
module.exports = router;