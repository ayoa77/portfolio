const express = require("express");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const moment = require('moment')

router.get("/", csrfProtection, (req, res, next) => {
    res.render('index.pug',{ csrfToken: req.csrfToken() });
});

app.get('/download', function (req, res) {
    //set up documenter to tell me when/if this has happened
    var file = __dirname + '/cv/ayoCV.pdf';
    res.download(file); // Set disposition and send it.
});


module.exports = router;

