const express = require('express');
const Pharma = require('../models/pharmacy');
const router = new express.Router();
const pharmaAuth = require('../middleware/pharmaAuth')
const multer = require('multer');
const sharp = require('sharp');
const upload = multer({
    limits:2500000,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/i)){
           return cb(new Error('Wrong file format'))
        }
        cb(undefined, true)
    }
})
//get all pharmacies
router.get('/api/pharmas', async(req, res) => {
    try {
        const pharmas = await Pharma.find()
        if(!pharmas){
            throw new Error('Document is empty')
        }
        res.send(pharmas)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// get single pharmacy
router.get('/api/pharmas/:id/details', async (req, res)=>{
    try {
        const pharma = await Pharma.findById(req.params.id)
        if(!pharma){
            throw new Error({message:'no found !'})
        }
        res.send(pharma)
    } catch (error) {
        res.status(404).send({message:'no found !'})
    }
})

//get pharma logo(serve logo)
router.get('/api/pharmas/:id/logo', async (req, res)=>{
    try {
        const pharma = await Pharma.findById(req.params.id);
        if(!pharma){
            throw new Error('No logo image available yet')
        }
        res.set('Content-Type', 'image/png');
        res.send(pharma.logo)
    } catch (error) {
        
    }
})

// get a pharmacy profile page
router.get('/api/pharmas/profile', pharmaAuth, async (req, res)=>{
    try {
        res.send(req.pharma)
    } catch (error) {
        res.status(404).send(error)
    }
})

//create new pharmacy
router.post('/api/pharmas', async (req, res)=>{
    try {
        const newPharmacy = new Pharma({
            name:req.body.name,
            address:req.body.address,
            city:req.body.city,
            telephone:req.body.telephone,
            email:req.body.email,
            password:req.body.password
        })
        const checkPharma = await Pharma.findOne().or([{name:newPharmacy.name}, {email:newPharmacy.email}])
        if(checkPharma){
            console.log(checkPharma)
            throw new Error('A Pharmacy with these details already exists')
        }
        const pharma = await newPharmacy.save();
        res.status(201).send(pharma)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// upload pharmacy logo 
router.post('/api/pharmas/profile/logo', pharmaAuth, upload.single('logo'), async (req, res)=>{
    try {
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        req.pharma.logo = buffer;
        const pharma = await req.pharma.save()
        res.send(pharma)
    } catch (error) {
        res.status(400).send(error)
    }
})

// login a pharmacy
router.post('/api/pharmas/login', async (req, res)=>{
    try {
        const loginPharma = await Pharma.getCredentials(req.body.email, req.body.password);
        const token = await loginPharma.generateToken();
        res.send({loginPharma, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

// logout a pharmacy session 
router.post('/api/pharmas/profile/logout', pharmaAuth, async (req, res)=>{
    try {
        req.pharma.tokens = req.pharma.tokens.filter(token => token.token !== req.token)
        req.pharma.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router;