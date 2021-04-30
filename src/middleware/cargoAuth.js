const jwt  = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const Cargo = require('../models/cargo')
const cargoAuth = async function(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, keys.jwtSecret);
        const cargo  = await Cargo.findOne({_id:decoded._id, 'tokens.token':token});
        if(!cargo){
            throw new Error()
        }
        req.cargo = cargo; //  make cargo available in request object
        req.token = token   //  make token available in request object
        next()
    } catch (error) {
        res.status(401).send({"error": "authentication required"})
    }
}
module.exports = cargoAuth;