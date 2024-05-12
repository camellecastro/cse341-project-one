const express = require('express');
const routes = express.Router();

const contactController = require('../controllers/contacts');

const validation = require('../middleware/validate')

routes.get('/', contactController.getAll);
routes.get('/:id', contactController.getSingle);
routes.post('/', validation.saveContact,contactController.createContact);
routes.put('/:id', validation.saveContact, contactController.updateContact);
routes.delete('/:id', contactController.deleteContact);

module.exports = routes;