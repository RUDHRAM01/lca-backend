const UserDefineController = require('../controllers/SchemaController');
const SchemaRouter = require('express').Router();

SchemaRouter.post('/create/:id', UserDefineController.createSchema);
SchemaRouter.get('/get/:id', UserDefineController.getSchema);
SchemaRouter.get('/get/name/:id', UserDefineController.getSchemaName);
SchemaRouter.get('/getById/:id', UserDefineController.getSchemaById);
SchemaRouter.put('/update/:id', UserDefineController.updateSchema);
SchemaRouter.delete('/delete/:id',UserDefineController.deleteSchema);


module.exports = SchemaRouter;