//Load Dep
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')

// const session = require('express-session');
const passport = require('passport')

//require and initalize dotenv
require('dotenv').config()

//PORT conf
const PORT = 5010

//Initalize express
const app = express()

//Database Configuration
const db = require('./config/db')

// Tell node.js to look for folder called for all ejs files (every time)
app.set('view engine', 'ejs')

// Look in views foolder for a file called layout.js
app.use(expressLayouts)

// Look for static file (CSS, JavaScript, Images, Videos, & Audio's) in the public folder
app.use(express.static('public'))

//Import Routes
const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const eventRouter = require('./routes/event')
const locationRouter = require('./routes/location')

//Mount Routes
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/event', eventRouter)
app.use('/location', locationRouter)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))
