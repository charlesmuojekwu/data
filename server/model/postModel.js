const mongoose = require ('mongoose')
const postSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    launchTime : {
        type : String,
        required : true,
        default : Date.now
    }
},{timestamps:true})

const postModel = mongoose.model('post',postSchema)

module.exports = postModel