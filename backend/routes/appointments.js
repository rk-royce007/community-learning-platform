const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const appointmentModel=require('../models/appointmentModel');
const mentorModel=require('../models/mentorModel')

router.post('/',function(req,res){
    const userId=req.body.userId
    appointmentModel.find({userId:userId,status:false})
    .exec()
    .then(appointment=>{
        if(appointment.length>0)
        {
            res.send("Already an appointment is pending").status(403);
        }
        else{
            const newAppointment=new appointmentModel({
                _id: new mongoose.Types.ObjectId(),
                userId: req.body.userId,
                mentorId:req.body.mentorId,
                timeSlot:req.body.timeSlot,
            })
            newAppointment.save(function(err){
                if(err)
                {
                    res.send(err).status(400)
                }
                else{
                    res.send("Success").status(201)
                }
            })
        }
        
    })
})

router.put('/changeStatus',function(req,res){
    const appointmentId=req.body.appointmentId;
    console.log(appointmentId)
    const status=true
    appointmentModel.updateOne({_id:appointmentId},{$set:{status:status}})
    .exec()
    .then(appointment=>{
      res.send(appointment).status(202);  
    })
    .catch(err=>{
        res.send(err)
    })
})


router.post('/mentorsRequestList',function(req,res){
    const mentorId=req.body.mentorId
    appointmentModel.find({mentorId:mentorId,status:false})
    .exec()
    .then(appointment=>{
        res.send(appointment).status(200)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/mentorList',function(req,res){
    console.log("asdasd",req.body)
    const mentorId=req.body.mentorId
    appointmentModel.find({mentorId:mentorId,status:true})
    .exec()
    .then(appointment=>{
        res.send(appointment).status(200)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.put('/giveRating',function(req,res){
    const rating=req.body.rating
    const id=req.body.appointmentId
    appointmentModel.updateOne({_id:id},{$set:{rating:rating}})
    .exec()
    .then(appointment=>{
        res.send(appointment).status(200)
        
        const mentorId=appointment.mentorId
        const totalusers=appointmentModel.find({mentorId:mentorId,rating:{ $exists:true }}).count()

        const oldRating=mentorModel.findOne({_id:mentorId}).rating
        const totalRating=(totalusers-1)*oldRating;
            const newRating=(totalRating+rating)/totalusers;
            mentorModel.updateOne({_id:mentorId},{$set:{rating:newRating}})
            .exec()
            .then(update=>{
                res.send("ratings updated").status(200)
            })
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/user',function(req,res){
    const userId=req.body.userId
    appointmentModel.find({userId:userId,status:true})
    .exec()
    .then(appointment=>{
        res.send(appointment).status(200)
    })
    .catch(err=>{
        res.send(err)
    })
})
module.exports=router