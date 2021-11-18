const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

//Middleeare
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//connect database
const Db_URI ='mongodb://localhost:27017/postsCrud'
mongoose.connect(Db_URI,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err.message))

var postsRoutes = require('./routes/api/posts')
app.use('/api/post',postsRoutes)

const port = process.env.PORT || 5000

app.listen(port,() => console.log(`Server started at Port at ${port}`))