// CRUD operation
const { Location } = require('../models/Location')
const { Category } = require('../models/Category')

// Create - HTTP GET and POST
// Read - HTTP GET
// Update - HTTP GET and POST
// Delete - HTTP DELETE

exports.location_create_get = (req, res) => {
  Category.find()
    .then((categorys) => {
      res.render('location/add', { categorys })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_create_post = (req, res) => {
  console.log(req.body)
  let location = new Location(req.body)

  // save location
  // Referenced Design Model
  location
    .save()
    .then(() => {
      req.body.category.forEach((category) => {
        Category.findById(category)
          .then((category) => {
            category.location.push(location)
            category.save()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      res.redirect('/location/index')
    })
    .catch((err) => {
      console.log(err)
      res.send('please try again later')
    })
}

exports.location_index_get = (req, res) => {
  Location.find()
    .populate('category')
    .then((location) => {
      res.render('location/index', { location })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_show_get = (req, res) => {
  console.log(req.query.id)
  Location.findById(req.query.id)
    .populate('category')
    .then((location) => {
      res.render('location/detail', { location, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_update_get = (req, res) => {
  console.log(req.query.id)
  Location.findById(req.query.id)
    .then((location) => {
      res.render('location/edit', { location })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_update_post = (req, res) => {
  console.log(req.body.id)
  Location.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/location/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_delete_get = (req, res) => {
  Location.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('index')
    })
    .catch((err) => {
      console.log(err)
    })
}
