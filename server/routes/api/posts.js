const express = require('express')
const mongoose = require('mongoose')

//post model
const postModel = require('../../model/postModel')

const router = express.Router()

//Get posts
router.get('/', async (req,res) => {
     await postModel.find()
        .then((result) => {
            console.log('Record found')
            res.send(result)
        })
        .catch((err) => console.log(err.message))     
  
})

//Add posts
router.post('/', async (req,res) => {
    posts = new postModel({
        text : req.body.text,
        launchTime : new Date()
    })

    posts.save()
        .then(() => res.status(201).send())
        .catch((err) => { 
            console.log(err.message)
            res.status(404).send()
        })


    
})


//Delete post
router.delete('/:id', async (req,res) => {
    let id = req.params.id
    await postModel.findByIdAndDelete(id)
        .then(() => res.status(200).send())
        .catch((err) => {
            console.log(err.message) 
            res.status(404).send() 
        })
})


module.exports = router