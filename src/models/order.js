const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products : {
        type: [mongoose.Schema.Types.ObjectId],
        required:true
    },
    customer:{
        type:mongoose.Schema.types.ObjectId,
        required:true
    },
    pharma:{
        type:mongoose.Schema.types.ObjectId,
        required:true
    },
    doctor:{
        type:mongoose.Schema.types.ObjectId,
        required:true
    },
    status:{
        approved:{
            type:Boolean,
            default:false
        },
        processed:{
            type:Boolean,
            default:false
        },
        delivered:{
            type:Boolean,
            default:false
        },
        canceled:{
            type:Boolean,
            default:false
        }
    },
    totalPrice: {
        type:Number,
        required:true
    },
    totalItems:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order