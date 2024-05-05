const express = require('express');
const routes = express.Router();

const contactController = require('../controllers/contacts');

routes.get('/', contactController.getAll);
routes.get('/:id', contactController.getSingle);
routes.post('/', contactController.createContact);
routes.put('/:id', contactController.updateContact);
routes.delete('/:id', contactController.deleteContact);

module.exports = routes;