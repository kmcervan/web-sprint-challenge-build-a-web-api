const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

module.exports = {
    checkAction,
    checkActionId,
    checkProject,
    checkProjectId
}

async function checkActionId(req, res, next){
    try{
        const actions = await Actions.get(req.params.id)
        if (actions){
            req.actions = actions
            next()
        }else{
            res.status(404).json('unable to find specific action')
        }
    }catch(error){
        next(error)
        // res.status(500).json('nope cannot find this')
    }
}

function checkAction(req, res, next){
    const { project_id, description, notes } = req.body;
    if(!req.body){
        res.status(400).json('all fields are missing')
    }else if(!project_id || !description || !notes){
        res.status(400).json({message: 'project id, desciption, and notes are required'})
    }else{
        next()
    }
}

async function checkProjectId(req, res, next){
    try{
      const project = await Projects.get(req.params.id)  
      if(!project){
          res.status(404).json('this project does not exist')
      }else{
          req.project = project
          next()
      }
    }catch(error){
        next(error)
    }
}

function checkProject(req, res, next){
    const {name, description} = req.body
    if(!req.body){
        res.status(400).json('all fields are missing')
    }else if(!name || !description){
        res.status(400).json('name and description are required')
    }else{
        next()
    }
}