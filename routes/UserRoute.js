const UserControllers = require('../controllers/UserController');
const UserRouter = require('express').Router();

UserRouter.post('/login', UserControllers.LoginUser);
UserRouter.post('/register', UserControllers.RegisterUser);
UserRouter.get('/verify', UserControllers.VerifyUser);

module.exports = UserRouter;