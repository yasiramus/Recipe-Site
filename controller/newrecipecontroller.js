//requiring the recipe model
const NewRecipe=require('../model/newrecipe');

//saving data
const SaveRecipe=(req,res)=>{

  console.log(req.body,req.file)

    const recipe={
        image:req.file.originalname,
        recipeName:req.body.recipeName,
        category:req.body.category,
        bio:req.body.bio,
        preparationTime:req.body.preparationTime,
        cookTime:req.body.cookTime,
        ingredients:req.body.ingredients,
        itemsNeeded:req.body.itemsNeeded,
        instructions:req.body.ingredients
    }
    
    const Recipe=new NewRecipe(recipe)
    Recipe.save().then(success=>{
        if (success) {
            res.send(success)
            // res.render('new',{:data})
        }
    }).catch(err=>{
        console.log(err.message)
    })
};

//fetching all information
const fetchRecipe=(req,res)=>{
  // console.log(req.body);
  NewRecipe.find().then(success=>{
    if(success){
      res.render('index',{title:'New Home Page', homeData:success})
    }
  }).catch(err=>{
    console.log(err.message)
  })
};

//rendering the detail page by fetching a single data blog
const FetchSingle =  (req, res) => {
   NewRecipe.findById(req.params.id).then((success) => {
      if (success) {
        console.log('Information has been fetched successfully')
        res.render('new',{title:'New Page',data: success})
          // res.send(result)
      }
  }).catch(err=>{
    console.log(err.message)
  })
};


const Aboutdata=(req,res)=>{
  NewRecipe.find().then(success =>{
    if(success){
      res.render('about',{title:'About Page',aboutData:success})
    }
  }).catch(err=>{
    console.log(err.message)
  })
};
const RecipeData=(req,res)=>{
  NewRecipe.find().then(success=>{
    if(success){
      res.render('recipes',{title:'Recipe Page',recipeData:success})
    }
  })
}

module.exports={
    SaveRecipe,
    fetchRecipe,
    FetchSingle,
    Aboutdata,
    RecipeData
  }
