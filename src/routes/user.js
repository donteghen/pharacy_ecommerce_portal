const userAuth = require('../middleware/userAuth');
const User = require('../models/user');
const express = require('express')
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router()

const upload = multer({
    limits:2500000,
    fileFilter(req, res, cb){
        if(!file.originalName.match('/\.(png|jpg|jpeg)$/i')){
            cb(new Error('file doesn\'t match '))
        }
        cb(underfined, true)
    }
})

//route for getting user profie
router.get('/api/users/profile', userAuth, async (req, res)=>{
    try {
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }
});

// route for serving user avatar
router.get('/api/users/:id/avatar', async(req, res)=>{
    try {
        const user = User.findById(req.params.id)
        if(!user) res.status(404).send()
        res.set('Content-Type','image/png')
    } catch (error) {
        res.status(400).send()
    }
})

//route for creating new user
router.post('/api/users', async (req, res)=>{
    try {
        const newUser = new User({
            name:req.body.name,
            surName:req.body.surName,
            address:req.body.address,
            city:req.body.city,
            email:req.body.email,
            password:req.body.password
        });
        const checkUser = await User.findOne({email:newUser.email})
        if(checkUser){
            res.status(400).send({error:'email already exists!'})
        }
        const user = await newUser.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
});

// route for logging user in
router.post('/api/users/login', async (req, res)=>{
    try {
        const loginUser = await User.getCredentials(req.body.email, req.body.password)
         const token = await loginUser.generateToken();
         res.send({loginUser, token})
    } catch (error) {
        res.status(400).send({error:"No such user exists"})
    }
})

//route to log user out
router.post('/api/users/profile/logout', userAuth, async (req, res)=>{
    console.log(req.token, req.user)
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.status(200).send({message:"success"});
    } catch (error) {
        res.status(500).send();
    }
})

// route for posting user avatar
router.post('/api/users/profile/avatar', userAuth, upload.single('avatar'), async(req, res)=>{
    try {
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        req.user.avatar = buffer;
        const user = await req.user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send('avatar upload failed')
    }
})

module.exports = router