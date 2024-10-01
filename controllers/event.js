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
const User = require('../models/User');

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

    console.log(request.body.status);
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

    Event.findById(req.query.id).populate(['category','location'])
    //if event is received from the db:
    .then((event) => {

    res.render("event/detail", {event, categories: event.category, dayjs });
        
    }).catch((err) => {
        console.log(err);
    });
}

exports.event_edit_get = (req, res) => {
    Event.findById(req.query.id).populate(['category','location'])
    .then(async (event) => {
        const [categories, locations] = await Promise.all([
            Category.find(), // Retrieve all categories
            Location.find(), // Retrieve all locations
          ]);
        res.render("event/edit", { event, categories, locations});
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

// Join Event
// Join Event
// Join Event
// Join Event
exports.event_join_post = (req, res) => {
    console.log(req.query.userId);
    console.log(req.query.eventId);

    User.findById(req.query.userId)
    .then((user) => {
        if (!user) {
            throw new Error("User not found");
        }

        // Ensure the 'event' field exists and is an array
        if (!user.event) {
            user.event = []; // Initialize if undefined
        }

        // // Check if the user has already joined the event
        // if (user.event.includes(req.query.eventId)) {
        //     return res.status(400).send("User has already joined this event");
        // }

        user.event.push(req.query.eventId); // Push the new event ID
        return user.save(); // Save the updated user object
    })
    .then(() => {
        console.log("User updated with new event");
        res.redirect("/profile/detail");
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred while joining the event");
    });
};



