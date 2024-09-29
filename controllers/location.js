// CRUD operation
const Location = require('../models/Location')
const Event = require('../models/Event')

// Create - HTTP GET and POST
// Read - HTTP GET
// Update - HTTP GET and POST
// Delete - HTTP DELETE

exports.location_create_get = (req, res) => {
  Event.find()
    .then((events) => {
      res.render('location/add', { events })
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
      console.log(req.body.event)
      req.body.event.forEach((event) => {
        Event.findById(event)
          .then((event) => {
            event.location.push(location)
            event.save()
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
    .populate('event')
    .then((location) => {
      res.render('location', { location })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_show_get = (req, res) => {
  console.log(req.query.id)
  Location.findById(req.query.id)
    .populate('event')
    .then((location) => {
      res.render('location/detail', { location })
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
      res.redirect('/location')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_delete_get = (req, res) => {
  Location.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/location')
    })
    .catch((err) => {
      console.log(err)
    })
}
