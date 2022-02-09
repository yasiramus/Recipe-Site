//implenting the controller method 
//importing or requiring the model in order to have access to the mongoose schema within the model
const ContactModel=require('../model/contact');
// const RecipeModel = require('../model/newrecipe')

//saving/sending data to the backend/server
module.exports.SaveContact=(req,res)=>{
    console.log(req.body);
    const contactForm={
        fullName:req.body.fullName,
        email:req.body.email,
        message:req.body.message
    };
    const contact=new ContactModel(contactForm);
    contact.save().then(data =>{
        if(data){
            // res.send(data)
            res.redirect('submit')
        }
    }).catch(err=>{
        console.log(err.message)
    })
};

module.exports.Submit=(req,res)=>{
    res.render('submit',{title:'Submit Page'})
}

//fetching all contact data
module.exports.FetchContact=(req,res)=>{
    ContactModel.find().then(data=>{
        if(data){
            res.send(data)
        }
    }).catch(err=>{
        console.log(err.message);
    })
}

