//Express Module
const express = require('express')

//invoke router functionaility
const router = express.Router()
router.use(express.urlencoded({ extended: true }))

//Controller
const eventCtrl = require('../controllers/event')

//Routes
router.get('/add', eventCtrl.event_create_get)
router.post('/add', eventCtrl.event_create_post)
router.get('/comment', eventCtrl.comment_create_get)
router.post('/comment', eventCtrl.comment_create_post)
router.get('/comment/delete', eventCtrl.comment_delete_get)
router.get('/index', eventCtrl.event_index_get)
router.get('/detail', eventCtrl.event_show_get)
router.get('/delete', eventCtrl.event_delete_get)
router.get('/edit', eventCtrl.event_edit_get)
router.post('/update', eventCtrl.event_update_post)

//Export the router
module.exports = router
