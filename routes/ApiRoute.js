const express = require('express');
const ApiController = require('../controllers/ApiController');
const ApiRouter = express.Router();


ApiRouter.post('/create/:id', ApiController.createApi);
ApiRouter.get('/get/:id', ApiController.getApi);
ApiRouter.delete('/delete/:id', ApiController.deleteApi);


module.exports = ApiRouter;
