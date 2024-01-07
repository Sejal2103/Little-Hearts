const express = require('express');
const router = express.Router();
const user= require('../models/user');
const {body, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs');
router.post('/create',
[
    //body('username','name is too short').isLength({min:5}),
    body('email','invalid email address').isEmail(),
    body('password','password is too short').isLength({min:5})
],

async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const duplicate = await user.findOne({ email : req.body.email}).exec();
    if(duplicate) { 
        alert("A user with this mail id already exists");
        return res.sendStatus(409);
    }  

    const salt= await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(req.body.password,salt);


    try{

        await user.create({
            username:req.body.username,
            email:req.body.email,
            password: securedPassword
        })
        res.json({success:true});
    } catch(err){
        console.log(err);
        res.json({success:false});
    }
})

module.exports = router