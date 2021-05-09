const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const bycrypt = require('bcryptjs');
const cargoSchema = new mongoose.Schema({
    logo:{
        type:Buffer
    },
    name:{
        type:String,
        required:[true, 'Name is required!']
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
cargoSchema.virtual('orders', {
    ref:'Order',
    localField:'_id',
    foreignField:'cargo'
})

// generate a token for a given user during sign up and login
cargoSchema.methods.generateToken = async function(){
    const cargo = this;
    const token = await jwt.sign({_id:cargo._id.toString()}, keys.jwtSecret);
    cargo.tokens = cargo.tokens.concat({token});
    await cargo.save();
    return token;
}

// modify the request boody object before sending it to the client
cargoSchema.methods.toJSON = function(){
    const cargo  = this;
    const cargoObject = cargo.toObject()
    delete cargoObject.password;
    delete cargoObject.tokens;
    return cargoObject;
}

// get cargos credentials
cargoSchema.statics.getCredentials = async function(email, password){
    const cargo = await Cargo.find({email:email});
    if(!cargo){
        throw new Error('cargo doesn\'t exist')
    }
    const isMatch = await bycrypt.compare(password, cargo.password) ;
    if(!isMatch){
        throw new Error('Authentication failed')
    }
    return cargo;
}
// check if cargo changed password for every update.
cargoSchema.pre('save', async function(next){
    const cargo = this;
    if(cargo.isModified('password')){
        cargo.password = await bycrypt.hash(cargo.password, 8)
    }
    next()
})

const Cargo = mongoose.model('Cargo', cargoSchema);
module.exports = Cargo;