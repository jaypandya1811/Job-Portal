const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/homecontroller');

router.get('/home', homecontroller.homepage);

router.get('/register', homecontroller.registerpage);

module.exports = router;