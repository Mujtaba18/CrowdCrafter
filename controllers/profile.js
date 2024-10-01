const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        const destinationPath = '../public/uploads/';
        console.log('Destination path:', destinationPath);
        cb(null, destinationPath);
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

exports.profile_get = (request, respond) => {
    // respond.send("Welcome to Blog App!");
    // respond.render("home/index", {welcomeMessage: "Welcome to My Blog App!!"});
    respond.render('profile/detail', {
        welcomeMessage: request.user ? `Welcome ${request.user.name} to your profile page!!` : "Welcome to Crowd Crafter Event Planner!",
        user: request.user
    });
};

// Update - HTTP REQUEST GET AND POST
exports.profile_edit_get = (request, respond) => {
    User.findById(request.user._id)
    .then((user) => {
        respond.render('profile/edit', {user});
    })
    .catch((err) => {
        console.log('The following error has occured' + err);
    });
};

exports.profile_update_post = (request, response) => {
    // Update the user's information in the database
    User.findByIdAndUpdate(request.user._id, request.body)
    
        .then(() => {
            console.log(`user id: ${request.user._id}`)
            console.log(`body: ${request.body}`)
            response.redirect('/profile/detail');
        })
        .catch((err) => {
            console.error('Error updating profile:', err);
            response.status(500).send('Error updating profile');
        });
};