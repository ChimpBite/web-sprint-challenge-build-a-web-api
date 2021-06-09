const Actions = require("../projects/projects-model");

function logger(req) {
  
  console.log(`${new Date().toUTCString()} ${req.method} to ${req.url} at ${req.get('Origin')}`);
}

async function validateProjectId (req, res, next) {
  const id = req.params.id;
  try{
    const action = await Actions.get(id);
    if(!action){
      res.status(404).json({message: "project not found"});
    } else{
      next();
    }
  } catch(error){
    res.status(500).json({message: 'Project could not be retrieved'});
  }
}

function validateProject(req, res, next) {
  const { description, project_id } = req.body;
  try{
      if(!description || !project_id){
          res.status(400).json({message: 'missing data'});
      } else{
        next();
      }
    } catch(error){
      res.status(400).json({message: 'missing required name field'});
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateProjectId,
  validateProject,
}