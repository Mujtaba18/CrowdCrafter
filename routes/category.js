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




//Export the router
module.exports = router;