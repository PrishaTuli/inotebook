const mongoose= require('mongoose');
const {Schema}=mongoose;
const notesschema= new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,//value will be an object special to mongoosedb
      ref:'user'//refers to user model
    },
    title:{type:String,
        required:true
    },
    description:{type:String,
        required:true
    },
    tag:{type:String,
        default:"general"
    },
    date:{type:Date,
        default:Date.now
    },
})
module.exports=mongoose.model('notes',notesschema);