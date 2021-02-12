// Write your "projects" router here!
const express = require('express');

// const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/api/projects', (req, res) => {
    //returns an array of actions (or an empty array) as the body of the response
    //no middleware is needed here
    Projects.get(req.query)
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the project',
        });
    });
});

router.get('/api/projects/:id', mw.validateProjectId, (req, res) => {
    //returns an action with the given id as the body of the response
    //this needs a middware to verify action id
    res.status(200).json(req.project)
});

// router.post('/api/projects/:id',mw.validateProjectId, mw.validateProject, (req, res) => {
//     //returns the newly created action as the body of the response
//     //this needs a middleware to check that the request (body?) is valid
//     const postInfo = {...req.body, project_id: 1};

//     Projects.insert(postInfo)
//     .then(actions => {
//         res.status(201).json(actions);
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).json({
//             message: 'Error adding action'
//         });
//     });
// });
router.put('/api/projects/:id', mw.validateProjectId, (req, res) => {
    //returns the updated action as the body of the response
    //this needs a middleware to verify action id
    //and another middleware to check that the request (body?) is valid 
    Projects.update(req.params.id, req.body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error updating the project'
        })
    })
});
router.delete('/api/projects/:id', mw.validateProjectId, (req, res) => {
    //returns no response body
    //this needs a middleware to verify action id
    Projects.remove(req.params.id)
    .then(count => {
        res.status(200).json({ message: 'the project has been deleted'});
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error removing project'});
    });
});
router.get('/api/projects/:id/actions', mw.validateProjectId, (req, res) => {
    //sends an array of actions (or an empty array) as the body of the response
    Projects.getProjectActions(req.params.id)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error getting the actions for this project'});
    });
});

//exporting the router
module.exports = router;