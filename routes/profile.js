const express = require('express');

const router = express.Router();

// Controllers
const profileCtrl = require('../controllers/profile');

// Routes
router.get('/detail', profileCtrl.profile_get);


module.exports = router;