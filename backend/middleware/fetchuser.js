var jwt=require('jsonwebtoken');
const JWT_SECRET="harryisgoodboy";
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');//token stores the auth-token requested from header
    if(!token){
        res.status(401).send({error:"please autheticate a valid token"});
    }
    try{
       const data=jwt.verify(token,JWT_SECRET);
       req.user=data.user;//attach user data to request object
       next();
    }catch(error){
        res.status(401).send({error:"please autheticate a valid token"});
    }
    
}
module.exports=fetchuser;