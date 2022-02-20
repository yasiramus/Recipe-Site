const express=require('express');
const router=express.Router();
const multer=require('multer');

const { checkUser } = require('../middleware/auth.user')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/imageUploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  const upload = multer({ storage});


//requiring the controller folder
const RecipeController=require('../controller/newrecipecontroller');

router.get('*', checkUser);

//saving data
router.post('/insertrecipe',upload.single('image'), RecipeController.SaveRecipe);

//fetching all information
router.get("/index",RecipeController.fetchRecipe);

router.get('/get-single-info/:id',RecipeController.FetchSingle);

router.get('/about',RecipeController.Aboutdata);

router.get('/all_recipes',RecipeController.AllRecipes)

router.get('/single-recipe',RecipeController.Single_Recipe)

router.get('/tag-template',RecipeController.Tag_Template)

router.post('/search',checkUser,RecipeController.Search)

router.get('/category',RecipeController.category)

router.post('/getRecipe',RecipeController.liveSearch)

router.get('/contact',RecipeController.ContactHome)

module.exports=router;