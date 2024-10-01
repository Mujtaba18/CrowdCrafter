
const User = require('../models/User');


exports.profile_get = (request, respond) => {
    respond.render('profile/detail', {
        welcomeMessage: request.user ? `Welcome, ${request.user.name} !` : "Welcome to Crowd Crafter!",
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
  // Log the incoming request body and file (if uploaded)
  console.log('Request body:', request.body);
  if (request.file) {
    console.log('Uploaded file:', request.file);
  } else {
    console.log('No file uploaded');
  }

  let updateData = request.body;

  // If a file was uploaded, add the file name to the user's update data
  if (request.file) {
    updateData.profileImage = request.file.filename;  // Store the file name in the user's record
    console.log('Profile image updated with file:', updateData.profileImage);
  }

  // Find the user by ID and update their profile
  User.findByIdAndUpdate(request.user._id, updateData)
    .then(() => {
      console.log(`User ${request.user._id} updated successfully.`);
      response.redirect('/profile/detail');
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
      response.status(500).send('Error updating profile');
    });
};