//Load Dep
const dayjs = require('dayjs');

//intialize the plugin
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//CRUD OPERATIONS

//Import models
const Event = require("../models/Event");
const Category = require("../models/Category");
const Location = require("../models/Location");

// Create - HTTP REQUEST GET AND POST
exports.event_create_get = (request, respond) => {

    //Send the categories information
    Category.find().then((categories) => {
        Location.find().then((locations) => {
            respond.render('event/add', {categories, locations});
        })
    })
    
};


exports.event_create_post = (request, respond) => {
    // Parse selected categories and colors from the request body
    const selectedCategories = JSON.parse(request.body.selectedCategories || '[]');

    
    // Create a new Event object based on the form data
    let event = new Event({
        name: request.body.name,
        date: request.body.date,
        time: request.body.time,
        description: request.body.description,
        status: request.body.status,      
        category: selectedCategories,
        location: request.body.location
    });

    // Save the event to the database
    event.save()
        .then(() => {
            console.log('Event created successfully:', event);
            respond.redirect('/event/index');  // Redirect to event list or index page
        })
        .catch((err) => {
            console.error('Error creating event:', err);
        });
};


// Read - HTTP GET 
exports.event_index_get = (req, res) => {
    Event.find()
        .populate(['category','location'])  // Populate the category field with actual category data
        .then((events) => {
            res.render('event/index', { events, dayjs });
        })
        .catch((err) => {
            console.log(err);
        });
};

//GET DEATILS
exports.event_show_get = (req, res) => {

    Event.findById(req.query.id).populate('category')
    //if event is received from the db:
    .then((event) => {

    res.render("event/detail", {event, categories: event.category, dayjs });
        
    }).catch((err) => {
        console.log(err);
    });
}

exports.event_edit_get = (req, res) => {
    Event.findById(req.query.id).populate('category')
    .then((event) => {
        res.render("event/edit", {event, categories: event.category});
    })
    .catch((err)=> {
        console.log(err)
    })
}

exports.event_update_post = (req, res) => {
    Event.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect("/event/index");
    })
    .catch((err) => {
        console.log(err)
    })
}

//Delete - HTTP DELETE
exports.event_delete_get = (req, res) => {
    console.log(req.query.id);
    Event.findByIdAndDelete(req.query.id)
    .then(()=> {
        res.redirect("/event/index");
    })
    .catch((err) => {
        console.log(err)
    })
}