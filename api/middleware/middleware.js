const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

async function validateActionId(req, res, next){
    try {
        const actions = await Actions.get(req.params.id)
        if (actions) {
            req.actions = actions
            next()
        } else {
            res.status(404).json(`action with id ${req.params.id} not found`)
        }
    }catch(error){
        res.status(500).json('oh no there is something wrong :O')
    }
}

function validateAction(req, res, next){
    const { action } = req.body;
    if (action) {
        next();
    }else {
        res.status(400).json({ message: 'missing action'})
    }
}

async function validateProjectId(req, res, next){
    try {
        const project = await Projects.get(req.params.id)
        if (project) {
            req.actions = project
            next()
        } else {
            res.status(404).json(`project with id ${req.params.id} not found`)
        }
    }catch(error){
        res.status(500).json('oh no there is something wrong :O')
    }
}

function validateProject(req, res, next){
    const { project } = req.body;
    if (project) {
        next();
    }else {
        res.status(400).json({ message: 'missing project'})
    }
}

// exporting middleware functions
module.exports = {
    validateActionId,
    validateAction,
    validateProjectId,
    validateProject,
}