const express  = require('express')
const cors  = require('cors')
const mongoose  = require('mongoose')
const dotenv = require('dotenv').config()
const routes = require('./routes/index')


const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

app.use(routes)

mongoose.connect(process.env.DB_URI)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})