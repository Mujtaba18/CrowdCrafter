
const User = require('../models/User');
const Event = require('../models/Event');


exports.profile_get = (request, respond) => {
  User.findById(request.user._id)
    .populate('event') // Populate the 'event' field
    .then((user) => {
      respond.render('profile/detail', {
        welcomeMessage: request.user ? `Welcome, ${request.user.name} !` : "Welcome to Crowd Crafter!",
        user, // Pass the populated user object
      });
    })
    .catch((err) => {
      console.error('Error fetching user:', err);
    });
};

// Update - HTTP REQUEST GET AND POST
exports.profile_edit_get = (request, respond) => {
    User.findById(request.user._id)
    .populate('event')
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

exports.event_leave_get = (request, response) => {
  User.findById(request.user._id)
    .then((user) => {
      const index = user.event.indexOf(request.query.id);
      if (index !== -1) {
        user.event.splice(index, 1); // Remove the event at the specified index
        user.save()
          .then(() => {
            response.redirect('/profile/detail');
          })
          .catch((err) => {
            console.error('Error saving user:', err);
          });
      } else {
        console.error('Event not found');
      }
    })
    .catch((err) => {
      console.error('Error fetching user:', err);
    });
};
