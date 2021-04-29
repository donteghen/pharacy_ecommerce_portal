const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const bycrypt = require('bcryptjs');
//const Pharmacy = require('./pharmacy')
const userSchema = new mongoose.Schema({
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
    isDoctor:{
       type:Boolean,
       default:false
   },
    isPharma:{
        type:Boolean,
        default:false
    },
    isAdmin:{
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

// generate a token for a given user during sign up and login
userSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id.toString()}, keys.jwtSecret);
    user.tokens = user.tokens.concate({token});
    await user.save();
    return token;
}

// modify the request boody object before sending it to the client
userSchema.methods.toJSON = function(){
    const user  = this;
    const userObject = user.toObject()
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

// get users credentials
userSchema.statics.getCredentials = async function(email, password){
    const user = await User.find({email:email});
    if(!user){
        throw new Error('user doesn\'t exist')
    }
    const isMatch = await bycrypt.compare(password, user.password) ;
    if(!isMatch){
        throw new Error('Authentication failed')
    }
    return user;
}
// check if user changed password for every update.
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycrypt.hash(user.password, 8)
    }
    next()
})

// check delete pharma for a user before deleting the user
// userSchema.pre('remove', async function(next){
//     const user = this;
//     await Pharmacy.deleteMany({owner:user._id});
//     next()
// })


const User = mongoose.model('User', userSchema);
module.exports = User;