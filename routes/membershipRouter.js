const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipcontroller');

router.get('/', membershipController.getMembership);
router.post('/', membershipController.validatePasscode, membershipController.postMembership);

module.exports = router;