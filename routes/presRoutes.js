const express = require("express");
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const moment = require('moment')

router.get("/drugs", csrfProtection, (req, res, next) => {
    res.render('incarceration.pug', { csrfToken: req.csrfToken() });
})


module.exports = router;

