const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/log-in', (req, res) => {
    res.render('log-in');
})
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
})
router.post('/sign-up', userController.validateSignUp, userController.signUpUser);
router.post('/log-in', userController.validateLogin, userController.loginUser);

router.get('/fullinfo', (req, res) => {
    res.render('fullinfo');
})
router.get('/log-out', userController.logOutUser);

module.exports = router;