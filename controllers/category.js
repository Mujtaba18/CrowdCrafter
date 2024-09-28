//Load Dep
const dayjs = require('dayjs');

//intialize the plugin
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

//CRUD OPERATIONS

//Import models
const Category  = require("../models/Category"); // It as object because exports is object

// Create - HTTP REQUEST GET AND POST
exports.category_create_get = (request, respond) => {
            respond.render('category/add');
};


exports.category_create_post = (request, respond) => {
    let category = new Category(request.body);
    console.log(request.body)

    // Save Article
    category.save()
        .then(() => {
            respond.redirect('/category/index');
        })
        .catch((err) => {
            console.log(err);
        });

    };

    //Read - HTTP GET
exports.category_index_get = (req, res) => {
    Category.find().then((categories)=>{
        res.render("category/index", {categories, dayjs});
        })
        .catch((err) => {
            console.log(err);
        })
    
}

//GET DEATILS
exports.category_show_get = (req, res) => {

    Category.findById(req.query.id)
    //if category is received from the db:
    .then((category) => {

    res.render("category/detail", {category, dayjs });
        
    }).catch((err) => {
        console.log(err);
    });
}


//Update - HTTP GET and POST
exports.category_edit_get = (req, res) => {
    console.log(req.query.id);
    Category.findById(req.query.id)
    .then((category) => {
        res.render("category/edit", {category});
    })
    .catch((err) => {
        console.log(err)
    })
}

exports.category_update_post = (req, res) => {
    Category.findByIdAndUpdate(req.body.id, req.body)
    .then(()=> {
        res.redirect("/category/index");
    })
    .catch((err) => {
        console.log(err)
    })
}


//Delete - HTTP DELETE
exports.category_delete_get = (req, res) => {
    console.log(req.query.id);
    Category.findByIdAndDelete(req.query.id)
    .then(()=> {
        res.redirect("/category/index");
    })
    .catch((err) => {
        console.log(err)
    })
}
