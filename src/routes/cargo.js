const express = require('express');
const Cargo = require('../models/cargo');
const router = new express.Router();
const cargoAuth = require('../middleware/cargoAuth')
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
//get all cargoes
router.get('/api/cargos', async(req, res) => {
    try {
        const cargos = await Cargo.find()
        if(!cargos){
            throw new Error('Document is empty')
        }
        res.send(cargos)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// get single cargo
router.get('/api/cargos/:id/details', async (req, res)=>{
    try {
        const cargo = await Cargo.findById(req.params.id)
        if(!cargo){
            throw new Error({message:'no found !'})
        }
        res.send(cargo)
    } catch (error) {
        res.status(404).send({message:'no found !'})
    }
})

//get cargo logo(serve logo)
router.get('/api/cargos/:id/logo', async (req, res)=>{
    try {
        const cargo = await Cargo.findById(req.params.id);
        if(!cargo){
            throw new Error('No logo image available yet')
        }
        res.set('Content-Type', 'image/png');
        res.send(cargo.logo)
    } catch (error) {
        
    }
})

// get a cargo profile page
router.get('/api/cargos/profile', cargoAuth, async (req, res)=>{
    try {
        res.send(req.cargo)
    } catch (error) {
        res.status(404).send(error)
    }
})

//create new cargo
router.post('/api/cargos', async (req, res)=>{
    try {
        const newCargo = new Cargo({
            name:req.body.name,
            telephone:req.body.telephone,
            email:req.body.email,
            password:req.body.password
        })
        const checkCargo = await Cargo.findOne().or([{name:newCargo.name}, {email:newCargo.email}])
        if(checkCargo){
            throw new Error('A Cargo company with these details already exists')
        }
        const cargo = await newCargo.save();
        res.status(201).send(cargo)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// upload cargo logo 
router.post('/api/cargos/profile/logo', cargoAuth, upload.single('logo'), async (req, res)=>{
    try {
        console.log(req.file.buffer)
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        req.cargo.logo = buffer;
        const cargo = await req.cargo.save()
        res.send(cargo)
    } catch (error) {
        res.status(400).send(error)
    }
})

// login a cargo
router.post('/api/cargos/login', async (req, res)=>{
    try {
        const loginCargo = await Cargo.getCredentials(req.body.email, req.body.password);
        const token = await loginCargo.generateToken();
        res.send({loginCargo, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

// logout a cargo session 
router.post('/api/cargos/profile/logout', cargoAuth, async (req, res)=>{
    try {
        req.cargo.tokens = req.cargo.tokens.filter(token => token.token !== req.token)
        req.cargo.save()
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router;