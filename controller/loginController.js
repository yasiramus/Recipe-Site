// requiring the login model 
const LoginModel = require('../model/login')

//sending or saving data tothe database
exports.saveLogin = async (req, res) => {
    console.log(req.body);
    const User =
    {
        fullName:req.body.fullName,
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    };

    try {
        const newLogin = new LoginModel(User)
        const Logs = await newLogin.save()
        if (Logs) {

            // res.send(Logs)
            res.redirect('accountsuccess')
        }
    } catch (error) {
        console.log(error)
    }
};

//displaying the register page
exports.DisplaySign = (req, res) => {
    res.render('register', { title: 'signUp Page' })
};

//displaying the login page
exports.Login = (req, res) => {
    res.render('login', { title: 'Login Page' })
};

//account creation success message
exports.AccountSuccess=(req,res)=>{
    res.render('accountsuccess')
}