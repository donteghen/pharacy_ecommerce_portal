module.exports = () =>{
    const mongoose = require('mongoose');
    const keys = require('./env/keys')
    mongoose.connect(keys.mongodbString, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log('yesy mongo')
}