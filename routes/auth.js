const express = require('express');

const router = express.Router();

const passport = require('passport');

// Controllers
const authCtrl = require('../controllers/auth');

// Routes
// Google OAuth login route
router.get('/auth/google', authCtrl.auth_google_get);

// Google OAuth callback route
router.get('/oauth2callback', authCtrl.auth_authCallBack_get);

// OAuth Log out route
router.get('/logout', authCtrl.logout_auth_google);

module.exports = router;