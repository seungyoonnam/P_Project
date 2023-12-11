const express = require('express');
var router = express.Router()

var report = require('../lib/report');


router.post('/naver',(req, res)=>{
    report.naver(req, res);
});

router.post('/feedback/:yn',(req, res)=>{
    report.feedback(req, res);
});

module.exports = router;
