const ReciepesModel = require('../models/Reciepes')
const UserModel = require('../models/Users')

const getAllReciepes = async (req, res) => {
    try{
        const response = await ReciepesModel.find({});
        res.json(response)
    }catch(err){
        res.json(err)
    }
}

const createReciepe = async (req, res) => {
    try{
        const recipe = await ReciepesModel.create(req.body);
        res.json(recipe)
    }catch(err){
        res.json(err)
    }
}

const saveReciepe = async (req, res) => {
    try{
        const recipe = await ReciepesModel.findById(req.body.recipeID)
        const user = await UserModel.findById(req.body.userID)
       await user.savedRecipes.push(recipe)
        await user.save();
        res.json({savedReciepe :  user.savedRecipes})
    }catch(err){
        res.json(err)
    }
}

const getSavedReciepeIds = async (req, res) => {
    try{
       const user = await UserModel.findById(req.params.userID)
        res.json({savedRecipes :  user?.savedRecipes})
    }catch(err){
        res.json(err)
    }
}

const getSavedReciepes = async (req, res) => {
    try{
       const user = await UserModel.findById(req.params.userID)
       const savedRecipes = await ReciepesModel.find({
        _id:{$in : user.savedRecipes}
       })
        res.json({savedRecipes})
    }catch(err){
        res.json(err)
    }
}


module.exports = {
    getAllReciepes,
    createReciepe,
    saveReciepe,
    getSavedReciepeIds,
    getSavedReciepes
}