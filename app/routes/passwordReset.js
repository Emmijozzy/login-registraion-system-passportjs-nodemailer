// Dependeencies
const express = require('express');
const router = express.Router();
const controller = require('../controllers/passwordReset');

// password reset
router.post("/", controller.passwordReset)

// reset password with token
router.post('/:userId/:token', controller.resetWithToken);

// reset password page
router.get('/:userId/:token', controller.resetPasswordPage)

module.exports = router
