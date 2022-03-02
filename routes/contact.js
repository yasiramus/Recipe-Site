// requiring express framework package
const express=require('express');

//requiring the controller folder
const Controller=require('../controller/contactcontoller');

//router level middleware
const router=express.Router();

//post request 
router.post('/insert',Controller.SaveContact );

//get request
router.get('/fetch-contact',Controller.FetchContact);

//get request
router.get('/submit',Controller.Submit);

module.exports=router;