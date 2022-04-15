// dependencies
const router = require('express').Router();

// custom dependencies
const userControllers = require('../controllers/user');

// Registraton route
router.post('/register', userControllers.registration);

// login route
router.post('/login', userControllers.login);

// resgistration page route 
router.get('/register', userControllers.regPage);

// login page route
router.get('/login', userControllers.loginPage);

module.exports = router;