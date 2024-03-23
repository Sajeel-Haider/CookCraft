const express = require('express');
const router = express.Router();

const  mongoose = require('mongoose')
const User = mongoose.model('User');

router.post('/signup',(req,res)=>{
    console.log(req.body)

    const {email,password,name}=req.body;
    const user=new User({email,password,name});
    user.save();

    res.send('hello')
  })
  
 module.exports = router;