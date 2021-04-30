const userAuth = require('../middleware/userAuth');
const User = require('../models/user');
const router = require('express').Router();
const multer = require('multer');
const sharp = require('sharp');
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
        const user = await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send('sign up failed')
    }
});


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