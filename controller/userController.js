//requiring the the bcrypt package
const bcrypt = require('bcrypt');

// requiring the login model 
const Users = require('../model/usermodel')

//requiring the helper module
const { handleErrors, generateToken } = require("../helpers/user.helper");

//sending or saving data tothe database
exports.saveLogin = async (req, res) => {
    // console.log(req.body)
    const UserDetails =
    {
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const newUsers = await new Users(UserDetails).save()//userdata saved to the database

        if (newUsers) {
            res.status(201).json({ newUsers: newUsers._id })//capturing/sending only the new created user id
            //remember this time around the redirection is being done at the 
            //fontend that is in the register module
        }
    } catch (err) {
        const errors = handleErrors(err);//calling the error handling in the helper module
        console.log(errors);
        res.status(400).json({ errors });
    }
};



//user login post request
exports.userLogin = async (req, res) => {

    const { userName, password } = req.body;
    // console.log(req.body);

    try {
        // checking for availability of the user in database
        const user = await Users.findOne({userName});

        //if user exit 
        if (user) {
            // do this if user is available
            //compare the signup password to the login password
            const isTheSame = await bcrypt.compare(password, user.password);

            if (isTheSame) {
                // generate jwt token 
                const token = generateToken(user._id);

                // set cookie for the login requests meaning generate a token when the user logs in
                res.cookie("isAdmin", token, { maxAge: 3 * 24 * 60 * 60 *1000, httpOnly: true });

                res.status(200).json({ isTheSame: user._id })

            }
             else {
                // res.status(401).json({ errors: "Authentication failed" });
                res.status(401).json({ errors: "Incorrect Password" });
                console.log(errors);
            }

        } 
        else {
            res.json({ errors: "Authentication failed" });
        }

    } catch (err) {
        const errors = handleErrors(err);
        console.log(errors)

        //this has been commented out because i got an error 
        //which says 
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        // res.status(400).json({ errors });
    }
};


//logging out a user
exports.logOut=(req,res)=>{
    //deleting the jwt token by replacing it a blank 
    //cookie
    res.cookie('isAdmin',"",{maxAge:1})
    res.redirect('/index')
}

//displaying the register page
exports.DisplaySign = (req, res) => {
    res.render('register', { title: 'signUp Page' })
};

//displaying the login page
exports.Login = (req, res) => {
    res.render('login', { title: 'Login Page' })
};

//account creation success message
exports.AccountSuccess = (req, res) => {
    res.render('accountsuccess')
}


exports.NewRecipe=(req,res)=>{
    res.render('newrecipeform',{title:'New Recipe Page'})
};
