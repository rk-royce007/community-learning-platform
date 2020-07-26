const mongoose=require('mongoose');

const mentorSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String,required:true},
    age: {type:Number},
    email: {type:String,required:true},
    password: {type:String,required:true},
    city: {type:String},
    gender: {type:String},
    contact: {type:Number,required:true},
    address: {type:String,required:true},
    qualification: {type:String},
    rating:{type:Number},
    timeSlots:{type:[Date]},
    profileimage:{type:String } 
    
});

module.exports=mongoose.model('mentor',mentorSchema);