const jwt  = require('jsonwebtoken')
const bcrypt  = require('bcrypt')
const UserModel = require('../models/Users')

const register = async (req, res) => {
    const {username, password} = req.body

    //check if user exists
    const user = await UserModel.findOne({username})

    if(user){
        return res.json({message : "User already exists!"})
    }

    
    const hashedPassword  =  await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
        username, 
        password : hashedPassword
    })
    
    res.json({message : "User registered successfully! "})

}

const login  = async (req, res) => {
    const {username, password} = req.body

    //check if user exists
    const user = await UserModel.findOne({username})

    if(!user){
        return res.json({message : "User doesn't exist, please create an account"})
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
        return res.json({message : "Username or Password is incorrect!"})
    }

    const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET)
    
    res.json({token, userID : user._id})
}

module.exports = {
    register,
    login
}