//Express Module
const express = require('express');


//invoke router functionaility
const router = express.Router(); 


//Controller
const indexCtrl = require('../controllers/index')

//Routes
router.get("/", indexCtrl.index_get)


//Export the router
module.exports = router;