const express = require('express');
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');  // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

// Controllers
const profileCtrl = require('../controllers/profile');
const ensureLoggedIn=require('../config/ensureLoggedIn')
// Routes
router.get('/detail',ensureLoggedIn, profileCtrl.profile_get);

router.get('/edit',ensureLoggedIn, profileCtrl.profile_edit_get);

// Add the upload middleware to handle the file upload in the POST request
router.post('/update', upload.single('profileImage'), profileCtrl.profile_update_post);

module.exports = router;