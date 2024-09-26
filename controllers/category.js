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