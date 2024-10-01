//Load Dep
const dayjs = require('dayjs')
const mongoose = require('mongoose')

//intialize the plugin
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//CRUD OPERATIONS

//Import models
const Event = require('../models/Event')
const Category = require('../models/Category')
const Feedback = require('../models/Feedback')
const User = require('../models/User')
const { request } = require('http')

// Create - HTTP REQUEST GET AND POST
exports.event_create_get = (request, respond) => {
  //Send the categories information
  Category.find().then((categories) => {
    respond.render('event/add', { categories })
  })
}

exports.event_create_post = (request, respond) => {
  // Parse selected categories and colors from the request body
  const selectedCategories = JSON.parse(request.body.selectedCategories || '[]')

  // Create a new Event object based on the form data
  let event = new Event({
    name: request.body.name,
    date: request.body.date,
    time: request.body.time,
    description: request.body.description,
    location: request.body.location,
    status: request.body.status,
    category: selectedCategories
  })

  // Save the event to the database
  event
    .save()
    .then(() => {
      console.log('Event created successfully:', event)
      respond.redirect('/event/index') // Redirect to event list or index page
    })
    .catch((err) => {
      console.error('Error creating event:', err)
    })
}

// comment get and post
exports.comment_create_get = (req, res) => {
  Feedback.find()
    .populate(['user', 'event'])
    .then((feedback) => {
      res.render('event/comment', { feedback })
    })
}

exports.comment_create_post = (req, res) => {
  console.log(req.body)

  let feedbacks = new Feedback({
    title: req.body.title,
    content: req.body.content,
    user: req.body.id, // Make sure this is correctly set
    event: req.body.eventId, // Adjust to match your form input name
    userName: req.body.userName
  })

  let id = req.body.eventId // Use the correct property name
  console.log('Event ID:', id) // Log the ID

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid event ID')
  }

  // Save the comment to the database
  feedbacks
    .save()
    .then(() => {
      res.redirect(`/event/detail?id=${id}`) // Redirect after saving
    })
    .catch((err) => {
      console.error('Error adding comment:', err)
      res.status(500).send('Error saving comment') // Optional error handling
    })
}

// Read - HTTP GET
exports.event_index_get = (req, res) => {
  Event.find()
    .populate('category') // Populate the category field with actual category data
    .then((events) => {
      res.render('event/index', { events, dayjs })
    })
    .catch((err) => {
      console.log(err)
    })
}

//GET DEATILS
exports.event_show_get = (req, res) => {
  Event.findById(req.query.id)
    .populate('category')
    //if event is received from the db:
    .then((event) => {
        // Find all feedbacks for this event by its id.
        Feedback.find({ event: event._id }) // Adjusted to find feedbacks related to the event
        .then((feedbacks) => {
          // Render the event details page, passing in event data and feedbacks
          res.render('event/detail', { event, categories: event.category, feedbacks, dayjs });
        })
        .catch((err) => {
          console.error('Error fetching feedbacks:', err);
          res.status(500).send('Error fetching feedbacks'); // Handle feedback fetching error
        });
        
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.event_edit_get = (req, res) => {
  Event.findById(req.query.id)
    .populate('category')
    .then((event) => {
      res.render('event/edit', { event, categories: event.category })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.event_update_post = (req, res) => {
  Event.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/event/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

//Delete - HTTP DELETE
exports.event_delete_get = (req, res) => {
  console.log(req.query.id)
  Event.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect('/event/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
