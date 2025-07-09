 const mongoose=require('mongoose');  
 const uri="mongodb://localhost:27017/?readPreference=primary&tls=false&directConnection=true" 
 function getconnection(){
    mongoose.connect(uri).then((data)=>{
        console.log("connected");
    }).catch((err)=>{console.log(err)})
 }
 module.exports=getconnection
