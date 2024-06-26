const ProjectController = require('../controllers/ProjectController');
const ProjectRouter = require('express').Router();


ProjectRouter.post('/create', ProjectController.createProject);
ProjectRouter.get('/all', ProjectController.getAllProjects);
ProjectRouter.get('/get/:id', ProjectController.getProject);

module.exports = ProjectRouter;