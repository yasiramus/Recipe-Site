//requiring the recipe model
const NewRecipe = require('../model/newrecipe');

//saving data
const SaveRecipe = (req, res) => {

  console.log(req.body, req.file)

  const recipe = {
    image: req.file.originalname,
    recipeName: req.body.recipeName,
    category: req.body.category,
    bio: req.body.bio,
    cookTime: req.body.cookTime,
    ingredients: req.body.ingredients,
    itemsNeeded: req.body.itemsNeeded,
    instructions: req.body.instructions
  }

  const Recipe = new NewRecipe(recipe)
  Recipe.save().then(success => {
    if (success) {
      // res.send(success)
      console.log('Data sent successfully')
      res.redirect('index')
    }
  }).catch(err => {
    console.log(err.message)
  })
};

//fetching all information
const fetchRecipe = (req, res) => {
  // console.log(req.body);
  NewRecipe.find().then(success => {
    if (success) {
      res.render('main', { title: 'Main Page', homeData: success })
    }
  }).catch(err => {
    console.log(err.message)
  })
};

const AllRecipes = (req, res) => {
  NewRecipe.find().then(success => {
    if (success) {
      res.render('recipes',{title:'All Recipes',recipeData:success})
    }
  }).catch(err => {
    console.log(err.message)
  })
};

//rendering the detail page by fetching a single data blog
const FetchSingle = (req, res) => {
  NewRecipe.findById(req.params.id).then((success) => {
    if (success) {
      console.log('Information has been fetched successfully')
      res.render('single_recipe', { title: 'Full details of recipe page', data: success })
    }
  }).catch(err => {
    console.log(err.message)
  })
};


//search section
const Search = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await NewRecipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } })
    // res.json(recipe)
    res.render('search', { title: 'search recipe', recipe })
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occured' })
  }
}

const liveSearch = async (req, res) => {
  let payload = req.body.payload.trim()
  // console.log(payload);
  let NewSearch = await NewRecipe.find({ recipeName: { $regex: new RegExp("^" + payload + ".*", "i") } }).exec()
  //limit search result to 10
  NewSearch = NewSearch.slice(0, 10)
  res.send({ payload: NewSearch })
}
//end of search seaction

const category = (req, res) => {
  NewRecipe.find().then(success => {
    res.render('category', { title: "cate", homeData: success })
  })
}

const ContactHome = (req, res) => {
  NewRecipe.find().then(success => {
    if (success) {
      res.render('contact', { title: 'About Page', contactHome: success })
    }
  }).catch(err => {
    console.log(err.message)
  })
};


module.exports = {
  SaveRecipe,
  fetchRecipe,
  FetchSingle,
  Search,
  category,
  liveSearch,
  ContactHome,
  AllRecipes
}
