const express=require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
router.use(cookieParser()); //cookies

const LoginController = require('../controller/loginController')
// router.post('/login',LoginController.SaveLogin)

router.post('/signup',LoginController.saveLogin)
router.get('/register',LoginController.DisplaySign)
router.get('/login',LoginController.Login);



module.exports=router;