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
  let location = new Location(req.body);

  // Log the incoming request body and files (if uploaded)
  console.log('Request body:', req.body);
  if (req.files && req.files.length > 0) {
    console.log('Uploaded files:', req.files);
  } else {
    console.log('No files uploaded');
  }

  // let createLocation = req.body;

  // If files were uploaded, add the file names to the location's data
  if (req.files && req.files.length > 0) {
    // Map through the files and collect their filenames
    const uploadedFileNames = req.files.map(file => file.filename);  
    console.log("uploadedFileNames", uploadedFileNames)
    location.locationImages = uploadedFileNames;  // Store an array of filenames in the location record
    console.log('Location images added with files:', location.locationImages);
  }

  // save location
  location
    .save()
    .then(() => {
      console.log("data saved")
      res.redirect('/location');
    })
    .catch((err) => {
      console.log(err);
      res.send('please try again later');
    });
};

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
  Location.findById(req.query.id)
    .then((location) => {
      res.render('location/edit', { location })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.location_update_post = (req, res) => {
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
