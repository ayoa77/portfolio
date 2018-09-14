const express = require("express");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const moment = require('moment');
const fs = require('fs');

router.get("/", csrfProtection, (req, res, next) => {
    res.render('index.pug',{ csrfToken: req.csrfToken() });
});

router.get('/download', function (req, res) {

    var file = fs.createReadStream('./public/cv/ayoCV.pdf');
    var stat = fs.statSync('./public/cv/ayoCV.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=ayoCV.pdf');
    file.pipe(res);
});


module.exports = router;

