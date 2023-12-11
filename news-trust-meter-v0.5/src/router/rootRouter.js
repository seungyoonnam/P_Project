const express = require('express');
var router = express.Router()

var news = require('../lib/news');


router.get('/',(req, res)=>{
    news.home(req, res);
});

router.get('/do',(req, res)=>{
    news.do(req, res);
});

router.get('/about',(req, res)=>{
    news.about(req, res);
});

router.get('/contact',(req, res)=>{
    news.contact(req, res);
});

router.post('/contact_process',(req, res)=>{
    news.contact_process(req, res);
});

router.post('/subscribe_process',(req, res)=>{
    news.subscribe_process(req, res);
});

module.exports = router;

