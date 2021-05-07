const express = require('express');
const userRouter = require('./routes/user');
const cors = require('cors')
require('../config/db')()
const app = express();

app.use(cors())
app.use(express.json());
app.get('/', (req, res)=>{
    res.send('testing')
})

app.use(userRouter)

module.exports = app;