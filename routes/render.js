const express=require('express');
const router=express.Router();
const RenderController=require('../controller/rendercontroller');

router.get('/contact',RenderController.contactForm);

router.get('/newrecipe',RenderController.NewRecipe);

// router.get('/rest',RenderController.Recipes);

router.get('/single-recipe',RenderController.SingleRecipe);

router.get('/tag-template',RenderController.TagRecipeTemplate);

module.exports=router;