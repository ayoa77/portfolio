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
    var fileUrl = "./public/cv/ResumeAyoAmadi.pdf";
    var fileName = "ResumeAyoAmadi.pdf";

    if(req.query.location === 'tw') {
        fileUrl = "./public/cv/AmadiCV.pdf";
        fileName = "AmadiCV.pdf";
    }
    
    var file = fs.createReadStream(fileUrl);
    var stat = fs.statSync(fileUrl);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    file.pipe(res);
});

router.get('/browser_language', function (req, res) {
      var browserLang = req.acceptsLanguages(
        "zh-TW",
        "zh"
      );
      var tw = false;
    if (browserLang) tw = true;
    console.log(browserLang);
    return res.status(200).json({
        tw: tw
      });
});


module.exports = router;

