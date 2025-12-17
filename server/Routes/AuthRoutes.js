const Auth = require('../Controllers/Auth');
const express = require('express');
const Router = express.Router();

Router.post('/signup', Auth.SignUp)
Router.post('/signin',Auth.SignIn)
Router.get('/allusers',Auth.getAllUsers)


module.exports = Router;