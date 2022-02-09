const express=require('express');
const router=express.Router();
const RenderController=require('../controller/rendercontroller');


router.get('/newrecipe',RenderController.NewRecipe);
router.get('/login',RenderController.Login);
module.exports=router;