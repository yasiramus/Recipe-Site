//requiring the mongoose npm package
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

//requiring the schema instance class
//the schema helps us to define the structure of the model
const {Schema} = mongoose;

const userSchema =new Schema({
    fullName: {
        type: String,
        required: [true,'Please enter fullname'],
        minlength:[5,'fullname should be above 5 charater'],
        maxlength: [50,'Username should more than 50 characters']
    },
    userName: {
        type: String,
        required: [true,'Please enter username'],
        maxlength: [10,'Username should below 40 characters']
    },
    email: {
        type: String,
        required: [true,'please enter email'],
        lowercase: true,
        maxlength: [50,'email entered must be below 50 characters']
    },
    password: {
        type: String,
        required: [true,'Please enter password'],
        minlength: [5,'Please password length should be six and above']
    },
    confirmPassword:{
        type: String,
        required: [true,'Renter previous password'],
        minlength: [5,'Please password length should be six and above']
    },
},{timestamps:true});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

//declaring a new variable and equating it to the mongoose model
const User = mongoose.model('User', userSchema);

module.exports = User;
