const express = require('express');
const userRouter = require('./routes/user');
const app = express();

app.get('/', (req, res)=>{
    res.send('testing')
})
app.use(userRouter)

module.exports = app;