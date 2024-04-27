const express = require('express');
const routes = express.Router();

const contactController = require('../controllers/contacts');

routes.get('/', contactController.getAll);
routes.get('/:id', contactController.getSingle);

module.exports = routes;