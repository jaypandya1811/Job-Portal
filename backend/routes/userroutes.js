const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller');
const resumes = require('../middlewares/multer');
const userauth = require('../middlewares/auth');

router.post('/registeruser', resumes.single("resume"), usercontroller.registeruser);

router.post('/login', usercontroller.login);

router.post('/logout', usercontroller.logout);

router.get('/viewuser/:id', usercontroller.getuserdetails);

router.get('/auth', userauth,usercontroller.authenticateduser);

router.put('/editdetails/:id', resumes.single("resume"), usercontroller.edituserdetails);

module.exports = router;