const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

// controller
const locationCtrl = require('../controllers/location')

// Routes
router.get('/add', locationCtrl.location_create_get)
router.post('/add', locationCtrl.location_create_post)
router.get('/', locationCtrl.location_index_get)
router.get('/detail', locationCtrl.location_show_get)
router.get('/edit', locationCtrl.location_update_get)
router.post('/edit', locationCtrl.location_update_post)
router.get('/delete', locationCtrl.location_delete_get)

module.exports = router
