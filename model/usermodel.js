//requiring the mongoose npm package
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//requiring the schema instance class
//the schema helps us to define the structure of the model
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter fullname"],
      minlength: [5, "fullname should be above 5 charater"],
      maxlength: [50, "Username should more than 50 characters"],
    },
    userName: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
      maxlength: [10, "Username should below 40 characters"],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      lowercase: true,
      unique: true,
      minlength: [5, "minimum email length should be above 5"],
      maxlength: [20, "email entered must be below 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: [5, "Please password length should be six and above"],
      maxlength: [20, "Sorry you exced the number of characters"],
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Re enter previous password"],
    //   minlength: [5, "Please password length should be six and above"],
    // },
  },
  { timestamps: true }
);

// this is a mongoose hooks
//fire a function before data has been sent to the database
//pre means before while post means after

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  // this refers to the instance of  a user created password

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//static method to login user

// userSchema.statics.login = async function(userName, password){
//   const user = await this.findOne({ userName })
//   //check do we have a user

//   if (user) {
//    const auth= await bcrypt.compare(password, user.password)//comparing the password the user signin with to the password we have in the database
//     //user.password is the hashed password in the database
//     //the if auth here means if the compare password matches return user
//     if(auth){
//       return user 
//     }
//     throw Error('incorrect password')
//   }
//   //if user doesn't exit
//   throw Error('incorrect username')
// }


//declaring a new variable and equating it to the mongoose model
const User = mongoose.model("User", userSchema);

module.exports = User;

