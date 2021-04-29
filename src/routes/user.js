const adminAuth = require('../middleware/adminAuth');
const userAuth = require('../middleware/userAuth');
const User = require('../models/user');
const router = require('express').Router();

router.get('/users', userAuth, adminAuth, async (req, res)=>{
    try {
        const users  = await User.find();
        if(!user){
            res.status(404).send('No user found')
        }
        res.send(users)
    } catch (error) {
        res.status(400)
    }
});

module.exports = router