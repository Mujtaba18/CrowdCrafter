//Load Dep
const dayjs = require('dayjs');

//intialize the plugin
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//CRUD OPERATIONS

//Import models
const Event = require("../models/Event");
const Category = require("../models/Category");

// Create - HTTP REQUEST GET AND POST
exports.event_create_get = (request, respond) => {

    //Send the categories information
    Category.find().then((categories) => {
        respond.render('event/add', {categories});
    })
    
};


exports.event_create_post = (request, respond) => {
    let event = new Event(request.body);
    console.log(request.body)

    // Save Event
    event.save()
        .then(() => {
            respond.redirect('/event/index');
        })
        .catch((err) => {
            console.log(err);
        });

    };


// Read - HTTP GET 
exports.event_index_get = (req, res) => {
    Event.find()
        .populate('category')  // Populate the category field with actual category data
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