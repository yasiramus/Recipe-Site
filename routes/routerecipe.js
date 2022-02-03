const express=require('express');
const router=express.Router();
const multer=require('multer');


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

//saving data
router.post('/insertrecipe',upload.single('image'), RecipeController.SaveRecipe);

//fetching all information
router.get('/index',RecipeController.fetchRecipe);

router.get('/get-single-info/:id',RecipeController.FetchSingle);

router.get('/about',RecipeController.Aboutdata);

router.get('/rest',RecipeController.RecipeData);
module.exports=router;