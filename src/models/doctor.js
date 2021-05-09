const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const bycrypt = require('bcryptjs');
//const Pharmacy = require('./pharmacy')
const doctorSchema = new mongoose.Schema({
    avatar:{
        type:Buffer
    },
    name:{
        type:String,
        required:[true, 'Name is required!']
    },
    surName: {
        type:String,
        required:[true, 'SurName is required!']
    },
    email:{
        type:String,
        required:[true, 'Email is required!'],
        unique: true,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required : [true, 'Password is required'],
        minlength:[6, 'minimum length must be 6 digits'],
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error("Password can't contain the keyword 'password'")
            }
        }
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    tokens : [{
        token:{
            type:String,
            required:true
        }
    }],
},
 {
    timestamps:true,
}
);
doctorSchema.virtual('orders', {
    ref:'Order',
    localField:'_id',
    foreignField:'doctor'
})

// generate a token for a given doctor during sign up and login
doctorSchema.methods.generateToken = async function(){
    const doctor = this;
    const token = await jwt.sign({_id:doctor._id.toString()}, keys.jwtSecret);
    doctor.tokens = doctor.tokens.concat({token});
    await doctor.save();
    return token;
}

// modify the request boody object before sending it to the client
doctorSchema.methods.toJSON = function(){
    const doctor  = this;
    const doctorObject = doctor.toObject()
    delete doctorObject.password;
    delete doctorObject.tokens;
    return doctorObject;
}

// get doctors credentials
doctorSchema.statics.getCredentials = async function(email, password){
    const doctor = await Doctor.find({email:email});
    if(!doctor){
        throw new Error('doctor doesn\'t exist')
    }
    const isMatch = await bycrypt.compare(password, doctor.password) ;
    if(!isMatch){
        throw new Error('Authentication failed')
    }
    return doctor;
}
// check if doctor changed password for every update.
doctorSchema.pre('save', async function(next){
    const doctor = this;
    if(doctor.isModified('password')){
        doctor.password = await bycrypt.hash(doctor.password, 8)
    }
    next()
})

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;