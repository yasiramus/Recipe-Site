const express=require('express');
const router=express.Router();
const RenderController=require('../controller/rendercontroller');


router.get('/newrecipe',RenderController.NewRecipe);
module.exports=router;