const express = require('express')
const multer = require('multer');

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/locations');  // Destination folder for uploaded files

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});

const upload = multer({ storage: storage });

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

// controller
const locationCtrl = require('../controllers/location')

// Routes
router.get('/add', locationCtrl.location_create_get)

router.get('/', locationCtrl.location_index_get)
router.get('/detail', locationCtrl.location_show_get)
router.get('/edit', locationCtrl.location_update_get)
router.post('/edit', locationCtrl.location_update_post)
router.get('/delete', locationCtrl.location_delete_get)

// Add the upload middleware to handle the file upload in the POST request
router.post('/add', upload.array('locationImages', 4), locationCtrl.location_create_post)

module.exports = router
