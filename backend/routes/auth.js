const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET="harryisgoodboy";
//create a user using:POST "/api/auth/". does not require authentication
//usind router.post instead of router.get
//route1
router.post(
  "/createuser",
  [
    body("name", "enter valid name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // obj={
    //     a:'thios',
    //     number:34
    // }
    // res.json(obj)
    // console.log(req.body);
    // res.send("hello");
    // const user=User(req.body);
    // user.save();
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    let user=await User.findOne({email:req.body.email});
    if (user){
      return res.status(400).json({success,error:"Sorry email already exists"})
    }
     const salt= await bcrypt.genSalt(10);//salt with 10 rounds
    const secpas= await bcrypt.hash(req.body.password,salt);
    user= await User.create({
      name:req.body.name,
      password:secpas,
      email:req.body.email})
    // }).then(user=>res.json(user));
    // const user = new User(req.body);
    // user.save();
    // res.send(req.body);
    const data={
      user:{id:user.id}
    }
    const authtoken=jwt.sign(data,JWT_SECRET);//creates new jwt(token)
    // console.log(jwtdata);
    // res.json(user);
    success=true;
    //sending respond to client
    res.json({success,authtoken});}
    catch(error){
      console.log(error.message);
    }
  }
);
//authenticate a user
//route2
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "can not be blank").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
      let user=await User.findOne({email});
      if (!user){
        success=false
        return res.status(400).json({success,error:"please try to login with correct credentials"})
      }
      const pascompare=await bcrypt.compare(password,user.password);
      if(!pascompare){
        success=false;
        return res.status(400).json({success,error:"please try to login with correct credentials"})
      }
      const data={
        user:{id:user.id}
      }

    const authtoken=jwt.sign(data,JWT_SECRET);
    success="true";
    res.json({success,authtoken});
  }catch(error){
    console.log(error.message);
  }
  })
  //route3
  //grtting loggedin user details
  router.post(
    "/getuser",fetchuser,async (req, res) => {
  try{
    userid=req.user.id;
    const user=await User.findById(userid).select("-password");//find user by id and password is not considered for security
    res.send(user);
  }catch(error){
    console.log(error.message);
  }
})
module.exports = router;
