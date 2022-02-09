

module.exports.NewRecipe=(req,res)=>{
    res.render('newrecipeform',{title:'New Recipe Page'})
};


module.exports.Login=(req,res)=>{
    res.render('login',{title:'Login Page'})
};
