const jwt  = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const Doctor = require('../models/doctor')
const doctorAuth = async function(req, res, next){
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, keys.jwtSecret);
        const doctor  = await Doctor.findOne({_id:decoded._id, 'tokens.token':token});
        if(!doctor){
            throw new Error()
        }
        req.doctor = doctor; //  make doctor available in request object
        req.token = token   //  make token available in request object
        next()
    } catch (error) {
        res.status(401).send("Doctor authentication required")
    }
}
module.exports = doctorAuth;