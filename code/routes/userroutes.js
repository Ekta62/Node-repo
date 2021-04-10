var express = require('express');
var usectrl = require('../controllers/usercontroller');
var approutes = express.Router();
approutes.get('/',usectrl.main);
approutes.get('/user',usectrl.newFile);
approutes.get('/admin',usectrl.adminModule);
module.exports=approutes;