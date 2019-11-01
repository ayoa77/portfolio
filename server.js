const express = require("express");
// const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
// const flash = require('connect-flash');
const sessions = require("client-sessions");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const csrfProtection = csrf({
  cookie: true
});

require("dotenv").config();

// app.use(cors({
//     'allowedHeaders': ['Content-Type'],
//     'origin': '*',
//     'methods': 'GET',
//     'preflightContinue': true
// }));

const pug = require("pug");
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(express.static("public"));

// configure the app to use bodyParser()
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//===SETTING UP COOKIE & SESSION VARIABLES===//
// const User = require("./api/models/userModel");

app.use(
  sessions({
    cookieName: "session",
    secret: process.env.secret,
    duration: 30 * 60 * 10000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
  })
);

// app.use((req, res, next) => {
//     if (req.session && req.session.user) {
//         User.findOne({
//             email: req.session.user.email
//         }, function (err, user) {
//             if (user) {
//                 req.user = user;
//                 delete req.user.password; //delete the hash pass from the session
//                 req.session.user = user;
//                 res.locals.user = user;
//             }
//             next();
//         });
//     } else {
//         next();
//     }
// });
// //================//

// //====FLASH======//
// app.use(flash());
// //===============//

const presRoutes = require("./routes/presRoutes");
const indexRoutes = require("./routes/indexRoutes");
const cmsRoutes = require("./routes/cmsRoutes");
const emailRoutes = require("./routes/emailRoutes");

//fs.readdirSync(__dirname + '/routes').forEach(function (filename) {
//    filename = filename.slice(0, -3);
//    filename = require('./routes/' + filename + '.js');
//    app.use('/', filename);
//});

// MODELS
fs.readdirSync(__dirname + "/models").forEach(function(filename) {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

// Connect to the db
if ("development" == app.get("env")) {
  console.log("you are running in dev mode");
  mongoose
    .connect("mongodb://localhost/ebs-pets?socketTimeoutMS=100000")
    .then(() => {
      console.log("Connected to Database");
    })
    .catch(err => {
      console.log("Not Connected to Database ERROR! ", err);
    });
  app.locals.pretty = true;
} else if ("production") {
  console.log("you are running in production");
  mongoose
    .connect("ebs-pets:pets1234EBS@localhost:27017/ebs?authSource=admin")
    .then(() => {
      console.log("Connected to Database");
    })
    .catch(err => {
      console.log("Not Connected to Database ERROR! ", err);
    });
}

mongoose.Promise = global.Promise;

/**
 * Put some variables for ejs to use
 */
app.use(function varsForPug(req, res, next) {
  // String(moment().format('YYYY/MM/DD hh:mm'))
  res.locals.moment = require("moment");
  // console.log(res.locals.moment.year())
  // res.locals._flashMessage = req.flash('message');
  // res.locals._flashError = req.flash('error');
  next();
});

/**
 * Authentication middlewares
 */
// function needAuth(req, res, next) {
//     if (req.session.user) next();
//     else {
//         req.flash('message', 'please login first');
//         res.redirect('/auth/login');
//     }
// }

// function noAuth(req, res, next) {
//     if (req.session.user) {
//         req.flash('message', 'you are already logged in');
//         res.redirect('/cms/index');
//     } else next();
// }


app.get("/robots.txt", function(req, res) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

// Routes which should handle requests
// app.use("/api/articles", articlesRoutes);
// app.use("/api/usershares", userShareRoutes);
// app.use("/api/keywords", keywordRoutes);
// app.use("/api/locations", locationRoutes);

// app.use("/auth", noAuth, authUserRoutes);

// app.use("/cms", needAuth);
// app.get("/cms/index", (req, res, next) => {
//     res.render('cms/cmsIndex', {});
// });
// app.use("/cms/seeds", seedsRoutes);
// app.use("/cms/users", cmsUserRoutes);

// app.use("/cms/", cmsRoutes);

app.use("/", indexRoutes);
app.use("/pres", presRoutes);
app.use("/email", emailRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
