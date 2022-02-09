// requiring the login model 
const LoginModel = require('../model/login')
const bcrypt = require('bcrypt');

const SaveLogin = (req, res) => {
    const login = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    try {
        //genertion of salt 
        const salt = await bcrypt.genSalt()

        const hashedPassword = await bcrypt.hash(password, salt)
        const newLogin = new login({
            username,
            email,
            password: hashedPassword
        })
        const userLogin = await LoginModel.save()
        res.send(userLogin)
    } catch (error) {
        console.log(error)
    }
}

module.exports=SaveLogin;