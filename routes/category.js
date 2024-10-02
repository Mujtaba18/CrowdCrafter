//Express Module
const express = require('express');


//invoke router functionaility
const router = express.Router(); 
router.use(express.urlencoded({extended: true}))

//Controller
const categoryCtrl = require('../controllers/category')
const ensureLoggedIn=require('../config/ensureLoggedIn')

//Routes
router.get("/add",ensureLoggedIn, categoryCtrl.category_create_get);
router.post("/add",ensureLoggedIn, categoryCtrl.category_create_post);
router.get("/index", categoryCtrl.category_index_get);
router.get("/detail", categoryCtrl.category_show_get);
router.get("/edit",ensureLoggedIn, categoryCtrl.category_edit_get);
router.post("/update",ensureLoggedIn, categoryCtrl.category_update_post);
router.get("/delete",ensureLoggedIn, categoryCtrl.category_delete_get);




//Export the router
module.exports = router;