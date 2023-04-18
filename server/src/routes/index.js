const express  = require('express')
const userRoutes = require('./api/users');
const recipesRoutes = require('./api/reciepes');



const routes = express.Router()

routes.use("/auth/users", userRoutes)
routes.use("/recipes", recipesRoutes)

module.exports = routes;