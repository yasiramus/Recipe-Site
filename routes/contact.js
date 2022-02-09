const express=require('express');

//requiring the controller folder
const Controller=require('../controller/contactcontoller');
//router level middleware
const router=express.Router();

router.post('/insert',Controller.SaveContact );

router.get('/fetch-contact',Controller.FetchContact);

router.get('/submit',Controller.Submit);


module.exports=router;