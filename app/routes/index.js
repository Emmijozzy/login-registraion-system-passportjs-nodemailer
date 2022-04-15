const router = require('express').Router();

const controllers = require('../controllers/index');
const isLoggedIn = require('../middlewares/auth')


// landing page
router.get('/landPage',  controllers.landingPage);

// Home page 
router.get('/home', isLoggedIn, controllers.homePage);

module.exports = router;