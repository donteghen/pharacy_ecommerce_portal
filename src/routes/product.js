const express = require('express');
const router = new express.Router();
const Product = require('../models/product');
const multer  = require('multer');
const path  = require('path');
const fs = require('fs');
const uploader = require('../helper/uploadTocloudinary');
//const userAuth = require('../middleware/userAuth')
const pharmaAuth = require('../middleware/pharmaAuth');
const sharp = require('sharp');
// const doctorAuth = require('../middleware/doctorAuth')
// const cargoAuth = require('../middleware/cargoAuth')
// const adminAuth = require('../middleware/adminAuth')
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './src/uploads')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage:storage,
    limits:{
        fileSize:2000000
    }
})
// get all products route
router.get('/api/products', async (req, res)=>{
    try {
        const products = await Product.find();
        if(!products){
            throw new Error('no products exists')
        }
        
        res.send(products)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// get single product details by id 
router.get('/api/products/:id/details', async (req, res)=>{
    try {
        const product  = await Product.findById(req.params.id);
        if(!product){
            res.status(404).send('no found')
        }
        res.send(product)
    } catch (error) {
        res.status(401).send(error.message)
    }
    
})

// post new product
router.post('/api/products',pharmaAuth, upload.array('images', 5), async (req, res)=>{
    try {

        const images = [];
        /** for cloudinary use *************************************************************** */
         const geturl = async (path) => await uploader(path)
         for(let file of req.files){
            const {path} = file
            const res =  await geturl(path)
            images.push(res)
            fs.unlinkSync(path)
        }
        /** for AWS S3 use *************************************************************** */
        

       if(!images.length ){
           throw new Error('please upload images')
       }
        const newProduct = new Product({
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            producer:req.body.producer,
            pzn:req.body.pzn,
            dosage:req.body.dosage,
            packaging:req.body.packaging,
            owner:req.pharma._id,
            category:req.body.category,
            images:images
        })
        const product =  await newProduct.save()
        req.pharma.pharma_products = req.pharma.pharma_products.concat(product._id);
        await req.pharma.save()
        
        res.send(newProduct)  

    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router