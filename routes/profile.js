const express = require('express');

const router = express.Router();

router.use(express.urlencoded({extended: true}))

// Controllers
const profileCtrl = require('../controllers/profile');

// Routes
router.get('/detail', profileCtrl.profile_get);

router.get('/edit', profileCtrl.profile_edit_get);
router.post('/update', profileCtrl.profile_update_post);

module.exports = router;