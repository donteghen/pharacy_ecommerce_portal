const express = require('express');
const userRouter = require('./routes/user');
const pharmaRouter = require('./routes/pharmacy');
const doctorRouter = require('./routes/doctor');
const cargoRouter = require('./routes/cargo')
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order')
const cors = require('cors')
require('../config/db')()
const app = express();

app.use('upload', express.static(__dirname+'public/'))
app.use(cors())
app.use(express.json());
app.get('/', (req, res)=>{
    res.send('testing')
})

app.use(userRouter)
app.use(pharmaRouter)
app.use(doctorRouter)
app.use(cargoRouter)
app.use(orderRouter)
app.use(productRouter)

module.exports = app;