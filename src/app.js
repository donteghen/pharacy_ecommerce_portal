const express = require('express');
const userRouter = require('./routes/user');
const pharmaRouter = require('./routes/pharmacy');
const cors = require('cors')
require('../config/db')()
const app = express();

app.use(cors())
app.use(express.json());
app.get('/', (req, res)=>{
    res.send('testing')
})

app.use(userRouter)
app.use(pharmaRouter)

module.exports = app;