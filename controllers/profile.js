const User = require('../models/User')

exports.profile_get = (request, respond) => {
    // respond.send("Welcome to Blog App!");
    // respond.render("home/index", {welcomeMessage: "Welcome to My Blog App!!"});
    respond.render('profile/detail', {
        welcomeMessage: request.user ? `Welcome ${request.user.name} to Crowd Crafter!!` : "Welcome to Crowd Crafter Event Planner!",
        user: request.user
    });
};