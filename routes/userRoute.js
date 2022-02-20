//requiring the express module
const express=require('express');
// const cookieParser = require('cookie-parser')
//accessing the router middleware

const router = express.Router();
// router.use(cookieParser()); //cookies

//requiring the auth.user  custom middleware 
const { checkUser,authUser } = require('../middleware/auth.user')

router.get('*', checkUser);
//requiring the controller module
const userController = require('../controller/userController')

//saving data to the database endpoint or path 
//signup endpoint
router.post('/signup', userController.saveLogin)

//saving data to the database endpoint or path
// login endpoint
router.post('/login', userController.userLogin)

// displaying the register page endpoint
router.get('/register', userController.DisplaySign)

// displaying the login page endpoint
router.get('/get_login', userController.Login)

// displaying the logout page endpoint
router.get('/logout', userController.logOut)

// displaying the acount success page endpoint
router.get('/accountSuccess',userController.AccountSuccess)

router.get('/newrecipe',authUser, userController.NewRecipe);
module.exports=router;