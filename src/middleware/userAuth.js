const jwt  = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const User = require('../models/user');
const userAuth = async function(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, keys.jwtSecret);
        const user  = await User.findOne({_id:decoded._id, 'tokens.token':token});
        if(!user){
            res.status(404).send()
        }
        req.user = user; //  make user available in request object
        req.token = token   //  make token available in request object
        next()
    } catch (error) {
        res.status(401).send({"error": "authentication required"})
    }
}
module.exports = userAuth;