const express = require('express');
const router = express.Router();
const jobcontroller = require('../controllers/jobscontroller');

router.post('/postjob', jobcontroller.addjob);

router.post('/savejob', jobcontroller.savejob);

router.get('/viewsavedjobs/:id', jobcontroller.viewsavedjobs);

router.get('/viewjobs', jobcontroller.viewjobs);

router.get('/jobdetails/:id', jobcontroller.viewjobdetails);

router.get('/mypostedjobs/:id', jobcontroller.viewjobrecruiter);

router.get('/search', jobcontroller.searchjob);

router.delete('/deletejob/:id', jobcontroller.deletejob);

module.exports = router;