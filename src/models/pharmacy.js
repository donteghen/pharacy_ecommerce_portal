const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../../config/env/keys');
const bycrypt = require('bcryptjs');

const pharmaSchema = new mongoose.Schema({
    logo:{
        type:Buffer
    },
    name:{
        type:String,
        required:[true, 'Name is required!']
    },
    address: {
        type:String,
        required:[true, 'SurName is required!']
    },
    city:{
        type: String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true, 'Email is required!'],
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
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
    pharma_products : {
        type: [mongoose.Schema.Types.ObjectId]
    },
    pharma_order : {
        type : [mongoose.Schema.Types.ObjectId]
    }
},
 {
    timestamps:true,
}
);
pharmaSchema.virtual('products', {
    ref:'Product',
    localField:'_id',
    foreignField:'owner'
})
pharmaSchema.virtual('orders', {
    ref:'Order',
    localField:'_id',
    foreignField:'pharma'
})

// generate a token for a given user during sign up and login
pharmaSchema.methods.generateToken = async function(){
    const pharma = this;
    const token = await jwt.sign({_id:pharma._id.toString()}, keys.jwtSecret);
    pharma.tokens = pharma.tokens.concat({token});
    await pharma.save();
    return token;
}

// modify the request boody object before sending it to the client
pharmaSchema.methods.toJSON = function(){
    const pharma  = this;
    const pharmaObject = pharma.toObject()
    delete pharmaObject.password;
    delete pharmaObject.tokens;
    return pharmaObject;
}

// get pharmas credentials
pharmaSchema.statics.getCredentials = async function(email, password){
    const pharma = await Pharma.findOne({email:email});
    if(!pharma){
        throw new Error('pharma doesn\'t exist')
    }
    const isMatch = await bycrypt.compare(password, pharma.password) ;
    if(!isMatch){
        throw new Error('Authentication failed')
    }
    return pharma;
}
// check if pharma changed password for every update.
pharmaSchema.pre('save', async function(next){
    const pharma = this;
    if(pharma.isModified('password')){
        pharma.password = await bycrypt.hash(pharma.password, 8)
    }
    next()
})

//check delete products for a pharma before deleting the pharma
pharmaSchema.pre('remove', async function(next){
    const pharma = this;
    await Products.deleteMany({owner:pharma._id});
    next()
})


const Pharma = mongoose.model('Pharma', pharmaSchema);
module.exports = Pharma;