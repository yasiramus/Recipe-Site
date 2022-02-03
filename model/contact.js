//requiring the mongoose npm package
const mongoose = require('mongoose');

//requiring the schema instance class
//the schema helps us to define the structure of the model
const {Schema} = mongoose;

const contactSchema =new Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 50
    },
    message: {
        type: String,
        required: true,
        maxlength: 200
    }
},{timestamps:true});

//declaring a new variable and equating it to the mongoose model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
