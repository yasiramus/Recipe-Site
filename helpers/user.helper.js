const jwt = require("jsonwebtoken");

// function for handling of error 

module.exports.handleErrors = (err) => {
  let errors = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }


  //incorrect email
  // if(err.message ==='incorrect UserName'){
  //   errors.userName='that userName isnt registered'
  // }
  // if(err.message==='incorrect password'){
  //   errors.password='that password is incorrect'
  // }

  //duplicate error for both username and email
  if (err.code === 11000) {
    errors.userName = "Failed! can't use this username!"
  }
  if (err.code === 11000) {
    errors.email = "Failed! you aren't allow to use this email"
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  };

  return errors;

};

// function for jwt token generation
module.exports.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60 * 1000,
  })
};
