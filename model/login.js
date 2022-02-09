//requiring the mongoose npm package
const mongoose = require('mongoose');

//requiring the schema instance class
//the schema helps us to define the structure of the model
const {Schema} = mongoose;

const loginSchema =new Schema({
    username: {
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
    password: {
        type: String,
        required: true,
        maxlength: 20
    }
},{timestamps:true});

//declaring a new variable and equating it to the mongoose model
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
