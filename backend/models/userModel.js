const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String,required:true},
    age: {type:Number},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    city: {type:String},
    gender: {type:String},
    contact: {type:Number,required:true},
    address: {type:String,required:true},
    stage: {type:Number,default:0},
    timeSlot:{type:Date},
    found:{type:Boolean,default:false}

});

module.exports=mongoose.model('user',userSchema);