const routes = require('express').Router();
const testController = require('../controllers/test');

routes.get('/', testController.helloWorld);
routes.use('/contacts', require('./contacts'));

module.exports = routes;