const express=require('express');
const router=express.Router();
const Note = require("../models/Note");
const fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require("express-validator");
//route1:get all notes
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    const notes= await Note.find({user:req.user.id});
    res.json(notes)
})
//route2:to add notes
router.post('/addnote',fetchuser,[
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "enter valid description").isLength({min:5}),
], async (req,res)=>{
    try{
    const{title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note= new Note({
     title,description,tag,user:req.user.id
    })
    const savednote= await note.save();
    res.json(savednote)}
    catch(error){
        console.log(error.message);
    }
})
//route3 update an existing note
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
  const {title,description,tag}=req.body;
  //create newnote object
  const newnote={};
  if(title){newnote.title=title};
  if(description){newnote.description=description};
  if(tag){newnote.tag=tag};
  //find note to be updated and update it
  let note= await Note.findById(req.params.id);
  if(!note){res.status(404).send("not found")}
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
  }
  note= await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
  res.json({note});
})
//route4 delete a note
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    //find note to be deleted and delete it
    let note= await Note.findById(req.params.id);
  if(!note){res.status(404).send("not found")}
  //allow deletion only if user owns this note
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed");
  }
  note= await Note.findByIdAndDelete(req.params.id);
  res.json({"sucess":"note has been deleted"})
})
module.exports= router