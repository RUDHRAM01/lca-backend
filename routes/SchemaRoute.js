const UserDefineController = require('../controllers/SchemaController');
const SchemaRouter = require('express').Router();

SchemaRouter.post('/create/:id', UserDefineController.createSchema);
SchemaRouter.get('/get/:id', UserDefineController.getSchema);


module.exports = SchemaRouter;