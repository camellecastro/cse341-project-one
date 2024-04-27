const routes = require('express').Router();
const testController = require('../controllers/test');

routes.get('/', testController.camelleRoute);
routes.use('/users', require('./users'));

module.exports = routes;