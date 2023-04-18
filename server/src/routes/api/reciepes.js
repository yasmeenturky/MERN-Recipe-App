const express  = require('express')
const { getAllReciepes, createReciepe, saveReciepe, getSavedReciepes, getSavedReciepeIds } = require('../../controllers/reciepesController')
const verifyToken = require('../../middleware/authMiddleware')


const recipesRoutes = express.Router()

recipesRoutes.get("/" , getAllReciepes)
recipesRoutes.post("/create-reciepe" , verifyToken, createReciepe)
recipesRoutes.put("/" , verifyToken, saveReciepe)
recipesRoutes.get("/savedRecipes/ids/:userID", verifyToken, getSavedReciepeIds)
recipesRoutes.get("/savedRecipes/:userID", verifyToken, getSavedReciepes)

module.exports =  recipesRoutes;