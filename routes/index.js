const router = require('express').Router();

router.use('/', require('./swagger'));

const testController = require('../controllers/test');

router.get('/', testController.helloWorld);

router.use('/contacts', require('./contacts'));

module.exports = router;