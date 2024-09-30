//Load Dep
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

// const session = require('express-session');
const passport = require('passport');
const session = require('express-session');

//require and initalize dotenv
require('dotenv').config();

//require and initalize passport
require('./config/passport');

//PORT conf
const PORT = process.env.PORT;

//Initalize express
const app = express();

//Database Configuration
const db = require('./config/db');

// Tell node.js to look for folder called for all ejs files (every time)
app.set("view engine", "ejs");

// Look in views foolder for a file called layout.js
app.use(expressLayouts);

// Look for static file (CSS, JavaScript, Images, Videos, & Audio's) in the public folder
app.use(express.static("public"));

// Passport and Sessions Configurations
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Share the information with the pages
app.use(function(request, respond, next) {
    respond.locals.user = request.user;
    next();
});

//Import Routes
const indexRouter = require('./routes/index');
const categoryRouter = require('./routes/category');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const eventRouter = require('./routes/event');


//Mount Routes
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/', authRouter);
app.use('/profile', profileRouter);
app.use('/event', eventRouter);

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`));