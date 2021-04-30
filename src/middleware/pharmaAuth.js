const jwt  = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const Pharma = require('../models/pharmacy')
const pharmaAuth = async function(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, keys.jwtSecret);
        const pharma  = await Pharma.findOne({_id:decoded._id, 'tokens.token':token});
        if(!pharma){
            throw new Error()
        }
        req.pharma = pharma; //  make pharma available in request object
        req.token = token   //  make token available in request object
        next()
    } catch (error) {
        res.status(401).send({"error": "authentication required"})
    }
}
module.exports = pharmaAuth;