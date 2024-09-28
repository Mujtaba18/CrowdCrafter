//Express Module
const express = require('express');


//invoke router functionaility
const router = express.Router(); 
router.use(express.urlencoded({extended: true}))

//Controller
const categoryCtrl = require('../controllers/category')

//Routes
router.get("/add", categoryCtrl.category_create_get);
router.post("/add", categoryCtrl.category_create_post);
router.get("/index", categoryCtrl.category_index_get);
router.get("/detail", categoryCtrl.category_show_get);
router.get("/edit", categoryCtrl.category_edit_get);
router.post("/update", categoryCtrl.category_update_post);




//Export the router
module.exports = router;