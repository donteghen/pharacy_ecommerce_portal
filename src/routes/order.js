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
            throw new Error('no orders found')
        }
        res.send(orders)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get single order details route
router.get('/api/orders/:id/details', async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id)
        if(!order){
            throw new Error('not found')
        }
        res.send(order)
    } catch (error) {
        res.status(400).send(error.message)
    }
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
        const order = await newOrder.save();
        req.user.user_orders = order._id;
        const user = await req.user.save()

        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// patch order for approval status by doctor route
router.patch('/api/orders/:id/approved', doctorAuth, async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new Error('not found');
        }

        order.status.approved = true;
        const approvedOrder = await order.save()
        res.send(approvedOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// patch order for processed status  route
router.patch('/api/orders/:id/processed', pharmaAuth, async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new Error('not found');
        }
        if(!order.status.approved){
            throw new Error('Please wait for order to be approved by the doctor')
        }

        order.status.processed = true;
        const processedOrder = await order.save()
        res.send(processedOrder)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
 
// patch order for delivered status by cargo route
router.patch('/api/orders/:id/delivered', cargoAuth, async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new Error('not found');
        }
        if(!order.status.processed){
            throw new Error('Please wait for order to be processed by the Pharma')
        }

        order.status.delivered = true;
        const deliveredOrder = await order.save()
        res.send(deliveredOrder)
    } catch (error) {
        res.status(400).send(error.message)
    } 
})

// patch order for canceled status by admin route
router.patch('/api/orders/:id/canceled',userAuth, adminAuth, async (req, res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            throw new Error('not found');
        }

        order.status.canceled = true;
        const canceledOrder = await order.save()
        res.send(canceledOrder)
    } catch (error) {
        res.status(400).send(error.message)
    } 
})

// delete order by admin route
router.delete('/api/orders/:id/delete', userAuth, adminAuth, async (re, res)=>{
    try {
        const order = await Order.deleteOne({_id:req.params.id});
        if(!order){
            throw new Error('not found');
        }

        res.send('successfully deleted')
    } catch (error) {
        res.status(400).send(error.message)
    } 
})

module.exports = router