const express = require('express');
const router = express.Router();
const applicationcontoller = require('../controllers/applicationscontroller');

router.post('/apply', applicationcontoller.addapplication);

router.delete('/deleteapplication/:id', applicationcontoller.deleteapplication);

router.get('/recruiter/:id', applicationcontoller.viewapplicationrecruiter);

router.get('/applicant/:id', applicationcontoller.viewapplicationapplicant);

module.exports = router;