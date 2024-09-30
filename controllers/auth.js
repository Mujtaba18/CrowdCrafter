const passport = require('passport');

exports.auth_google_get = passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
        // Requesting the user's profile and email
        scope: ['profile', 'email'],
        // Optionally force pick account every time
        // prompt: "select_account"
    }
);

exports.auth_authCallBack_get =
    passport.authenticate(
        'google',
        {
            successRedirect: '/',
            failureRedirect: '/article/index'
        }
    );

exports.logout_auth_google = (request, respond) => {
    request.logout(function () {
        respond.redirect('/');
    });
}