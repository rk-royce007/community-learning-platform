const mongoose =require('mongoose')

const appointmentSchema=mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:true
        },
        mentorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'mentor',
            required:true
        },
        timeSlot:{
            type:Date,
            required:true
        },
        status:{
            type:Boolean,
            default:false,
        },
        rating:{
            type:Number
        }
    },
)
module.exports=mongoose.model('appointment',appointmentSchema)