//Express Module
const express = require('express');


//invoke router functionaility
const router = express.Router(); 
router.use(express.urlencoded({extended: true}))

//Controller
const eventCtrl = require('../controllers/event')


//Routes
router.get("/add", eventCtrl.event_create_get);
router.post("/add", eventCtrl.event_create_post);
router.get("/index", eventCtrl.event_index_get);
router.get("/detail", eventCtrl.event_show_get);
router.get("/delete", eventCtrl.event_delete_get);


//Export the router
module.exports = router;

