const Auth = require('../Controllers/Auth');
const express = require('express');
const Router = express.Router();

Router.get('/', Auth.SignUp)


module.exports = Router;