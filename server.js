//Load Dep
// const session = require('express-session');
const session = require('express-session')
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const imgSchema = require('./models/Location')
const passport = require('passport')

//require and initalize dotenv
require('dotenv').config()

//require and initalize passport
require('./config/passport')

//PORT conf
const PORT = process.env.PORT

//Initalize express
const app = express()

//Database Configuration
const db = require('./config/db')

// Tell node.js to look for folder called for all ejs files (every time)
app.set('view engine', 'ejs')

// Look in views foolder for a file called layout.js
app.use(expressLayouts);

// Look for static file (CSS, JavaScript, Images, Videos, & Audio's) in the public folder
app.use(express.static('public'))

app.use('/uploads', express.static('public/uploads'));
app.use('/locations', express.static('public/locations'));
// tesing to add a photo code
mongoose.connect(process.env.MongoDBURL).then(console.log('it works photo'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
const upload = multer({ storage: storage })

app.get('/location/add', (req, res) => {
  imgSchema.find({}).then((data, err) => {
    if (err) {
      console.log(err)
    }
    res.render('location/add', { items: data })
  })
})

app.post('/location/add', upload.single('image'), (req, res) => {
  let obj = {
    names: req.body.names,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/uploads/' + req.file.filename)
      ),
      contentType: 'image/png'
    }
  }
  imgSchema.create(obj).then((err, item) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/location')
    }
  })
})

// Passport and Sessions Configurations
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())


// Share the information with the pages
app.use(function (request, respond, next) {
  respond.locals.user = request.user
  next()
})

//Import Routes
const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const eventRouter = require('./routes/event')
const locationRouter = require('./routes/location')
const { name } = require('ejs')

//Mount Routes
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/', authRouter)
app.use('/profile', profileRouter)
app.use('/category', categoryRouter)
app.use('/event', eventRouter)
app.use('/location', locationRouter)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))
