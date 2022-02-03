module.exports.contactForm=(req,res)=>{
    res.render('contact',{title:'Contact Page'})
};

module.exports.NewRecipe=(req,res)=>{
    res.render('newrecipe',{title:'New Recipe Page'})
};

// module.exports.Recipes=(req,res)=>{
//     res.render('recipes',{title:'Recipe Page'})
// };

module.exports.SingleRecipe=(req,res)=>{
    res.render('single-recipe',{title:'Single recipes'})
};

module.exports.TagRecipeTemplate=(req,res)=>{
    res.render('tag-template',{title:'Tag Template Recipe Page'})
};
