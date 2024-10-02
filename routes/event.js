//Express Module
const express = require('express')

//invoke router functionaility
const router = express.Router()
router.use(express.urlencoded({ extended: true }))

//Controller
const eventCtrl = require('../controllers/event')
const ensureLoggedIn=require('../config/ensureLoggedIn')

//Routes
router.get('/add',ensureLoggedIn, eventCtrl.event_create_get)
router.post('/add',ensureLoggedIn, eventCtrl.event_create_post)
router.get('/comment',ensureLoggedIn, eventCtrl.comment_create_get)
router.post('/comment',ensureLoggedIn, eventCtrl.comment_create_post)
router.get('/comment/delete',ensureLoggedIn, eventCtrl.comment_delete_get)
router.get('/index', eventCtrl.event_index_get)
router.get('/detail', eventCtrl.event_show_get)
router.get('/delete',ensureLoggedIn, eventCtrl.event_delete_get)
router.get('/edit',ensureLoggedIn, eventCtrl.event_edit_get)
router.post('/update',ensureLoggedIn, eventCtrl.event_update_post)
router.get('/join',ensureLoggedIn, eventCtrl.event_join_post)

//Export the router
module.exports = router
