const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    producer:{
        type:String,
        required:true,
        trim:true
    },
    pzn:{
        type:String,
        required:true,
        trim:true
    },
    dosage:{
        type:Number,
        required:true
    },
    packaging:{
        type:Number,
        required:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId
    },
    category:{ 
        type:String,
        required:true,
        trim:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ]
},{
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product