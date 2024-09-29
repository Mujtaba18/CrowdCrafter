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


//Read - HTTP GET 
exports.event_index_get = (req, res) => {
    Category.find().then((categories) =>{
        console.log(categories);

        Event.find().then((events)=>{
            // Render the page and pass both events and categories to the view
            res.render("event/index", { events, categories, dayjs });
            })
            .catch((err) => {
                console.log(err);
            })

    }).catch((err) => {
        console.log(err);
    })
    
    
}

//GET DEATILS
exports.event_show_get = (req, res) => {

    Event.findById(req.query.id)
    //if event is received from the db:
    .then((event) => {

    res.render("event/detail", {event, dayjs });
        
    }).catch((err) => {
        console.log(err);
    });
}