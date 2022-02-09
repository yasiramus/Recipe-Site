const mongoose = require('mongoose');

const { Schema } = mongoose;

const newRecipeSchema = new Schema({
    image: {
        type:String
    },
    recipeName: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 50
    },
    category:{
        type: String,
        enum:{
            values:['Beef','Breakfast','Lunch','Snack','Dinner'],
            message:'{VALUE} is not supported'
        }
    },
    bio: {
        type: String,
        required: true,
        maxlength: 800
    },
    preparationTime: {
        type: String,
        required: true,
        maxlength: 30
    },
    cookTime: {
        type: String,
        required: true,
        maxlength: 30
    },
    ingredients: {
        type: String,
        required: true,
        maxlength: 300
    },
    itemsNeeded: {
        type: String,
        required: true,
        maxlength: 300
    },
    instructions: {
        type: String,
        required: true,
        maxlength: 700
    }
},{timestamps:true});


newRecipeSchema.index({recipeName:'text',category:'text'})
const Recipe=mongoose.model('Recipe',newRecipeSchema);

module.exports=Recipe;