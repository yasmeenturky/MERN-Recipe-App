const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    savedRecipes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reciepes"
    }]
})

module.exports = mongoose.model("users", UserSchema)