const express = require('express');
const router = new express.Router();
const Order = require('../models/order')
const userAuth = require('../middleware/userAuth')
const pharmaAuth = require('../middleware/pharmaAuth')
const doctorAuth = require('../middleware/doctorAuth')
const cargoAuth = require('../middleware/cargoAuth')
const adminAuth = require('../middleware/adminAuth')

// get all orders route
router.get('/api/orders', async (req, res)=>{
    try {
        const orders = await Order.find()
        if(orders.length === 0){
            throw new Error('no orders founds')
        }
        res.send(orders)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get single order details route
router.get('/api/orders/:id/details', async (req, res)=>{
    
})

// post new order by user route
router.post('/api/orders', userAuth, async (req, res)=>{
    try {

        const newOrder = new Order({
            products:req.user.user_cart,
            pharma:req.body.pharma,
            doctor:req.body.doctor,
            user:req.user.id,
            totalPrice:req.body.totalPrice,
            totalItems:req.body.totalItems
        })
        // const order = await order.save();
        // req.user.user_orders = order._id;
        // const user = await req.user.save()

        res.status(201).send(newOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// patch order for approval status by doctor route
router.patch('/api/orders/:id/approved', doctorAuth, async (req, res)=>{

})

// patch order for processed status  route
router.patch('/api/orders/:id/processed', pharmaAuth, async (req, res)=>{

})
 
// patch order for delivered status by cargo route
router.patch('/api/orders/:id/delivered', cargoAuth, async (req, res)=>{

})

// patch order for canceled status by admin route
router.patch('/api/orders/:id/delivered', adminAuth, async (req, res)=>{

})

// delete order by admin route
router.delete('/api/orders/:id/delete', adminAuth, async (re, res)=>{

})

module.exports = router