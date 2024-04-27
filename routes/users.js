const express = require('express');
const routes = express.Router();

const userController = require('../controllers/users');

routes.get('/', userController.getAll);
routes.get('/:id', userController.getSingle);

module.exports = routes;