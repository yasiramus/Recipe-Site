const jwt=require("jsonwebtoken");
const User = require('../model/usermodel');

//protecting rountes
module.exports.authUser = (req, res, next) => {
    const token = req.cookies.isAdmin
    // checking the json web token to see if it exit 
    if(token) {
        //varify token if it exit
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            //if err redirect the person to the login page
            if(err) {
                console.log(err.message);
                res.redirect('/get_login');
            } else {
                console.log(decoded)
                next();
            }
        })
    } else {
        res.redirect('/get_login');
    }
}

//checking current user
module.exports.checkUser = (request, response, next) => {
    const token = request.cookies.isAdmin;
    //does this token exit

    //if the token exit varify the token againt the secret
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if(err) {
                console.log(err);
                response.locals.user = null;
                next();
            } else {
                console.log(decoded);
                const user = await User.findById(decoded.id);
                response.locals.user = user;
                next()
            }
        })
    } else {
        response.locals.user = null;
        next()
    }
}
