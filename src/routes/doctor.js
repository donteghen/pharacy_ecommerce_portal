const Doctor = require('../models/doctor');
const express = new require('express');
const router = express.Router();
const doctorAuth = require('../middleware/doctorAuth');
const multer = require('multer');
const sharp = require('sharp');

const upload = multer({
    limits:2500000,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/i)){
            return cb(new Error('file doesn\'t match'))
        }
        cb(undefined, true)
    }
})

// get all doctors route
router.get('/api/doctors', async (req, res)=>{
   try {
    const doctors = await Doctor.find();
    if(!doctors){
        throw new Error('No doctor exists')
    }
    res.send(doctors)
   } catch (error) {
       res.status(400).send(error)
   }
})

//get single doctor by id route
router.get('/api/doctors/:id/details', async (req, res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor){
            throw new Error('doesn\'t exist')
        }
        res.send(doctor)
       } catch (error) {
           res.status(400).send(error)
       }
})
//get doctors profile route
router.get('/api/doctors/profile', doctorAuth, async (req, res)=>{
    try {
        res.send(req.doctor)
    } catch (error) {
        res.status(404).send(error)
    }
})
//get doctors avatar route
router.get('/api/doctors/:id/avatar', async (req, res)=>{
    try {
        const doctor = await Doctor.findById(req.params.id);
        res.set('Content-Type', 'image/png');
        res.send(doctor.avatar)
    } catch (error) {
        res.status(400).send()
    }
})
//post new doctor route
router.post('/api/doctors', async (req, res)=>{
    try {
        const newDoctor = new Doctor({
            name:req.body.name,
            surName:req.body.surName,
            telephone:req.body.telephone,
            email:req.body.email,
            password:req.body.password
        })
        const checkDoctor = await Doctor.findOne({email:newDoctor.email})
        if(checkDoctor){
            throw new Error('A doctor with provided email already exists !')
        }
        const doctor = await newDoctor.save();
        res.status(201).send(doctor);
    } catch (error) {
        res.status(400).send(error);
    }
})
// post an avatar upload for doctor
router.post('/api/doctors/profile/avatar', doctorAuth, upload.single('avatar'), async (req, res)=>{
    try {
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
        req.doctor.avatar = buffer;
        const doctor = await req.doctor.save()
        res.send(doctor)
    } catch (error) {
        res.status(400).send(error)
    }
})
//login doctor  session route 
router.post('/api/doctors/login', async (req, res)=>{
   try {
    const doctor = await Doctor.getCredentials(req.body.email, req.body.password);
    const token = await doctor.generateToken();
    res.send({doctor, token})
   } catch (error) {
       res.status(400).send(error)
   }
})
// logout doctor sessions route
router.post('/api/doctors/profile/logout', doctorAuth, async (req, res)=>{
    try {
        req.doctor.tokens = req.doctor.tokens.filter(token => token.token !== req.token)
        await req.doctor.save();
        res.send()
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router