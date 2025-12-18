const Auth = require('../Controllers/Auth');
const { verifyToken } = require('../Middleware/auth');
const express = require('express');
const Router = express.Router();

Router.post('/signup', Auth.SignUp)
Router.post('/signin',Auth.SignIn)
Router.get('/allusers', Auth.getAllUsers)


module.exports = Router;