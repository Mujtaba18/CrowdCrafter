//Load Dep
const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const imgSchema = require('./models/Location')

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

// tesing to add a photo code
mongoose.connect(process.env.MongoDBURL).then(console.log('it works photo'))

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

//Import Routes
const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const eventRouter = require('./routes/event')
const locationRouter = require('./routes/location')
const { name } = require('ejs')

//Mount Routes
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/event', eventRouter)
app.use('/location', locationRouter)

//listen on port
app.listen(PORT, () => console.log(`running on port: ${PORT}`))
