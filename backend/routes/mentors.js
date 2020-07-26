const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const multer = require('multer');
const mentorModel=require('../models/mentorModel');
const userModel=require('../models/userModel')
const bcryptjs = require('bcryptjs'); // Encryption
const jwt=require('jsonwebtoken');

var upload = multer({dest: './public/upload'});



router.post('/getmentor',function(req,res){
    
    const id=req.body.mentorId;
    console.log("asd",req.body)
    mentorModel.findOne({_id:id})
    .exec()
    .then(mentor=>{
        res.send(mentor).status(200);
    })
})

router.post('/timeSlot',function(req,res){
    // res.send("mentor's Home").status(200);

    const timeSlot=req.body.timeSlot
    console.log(timeSlot,req.body.city)
    mentorModel.find({timeSlots:timeSlot,city:req.body.city})
    .exec()
    .then(mentorData=>{
        res.send(mentorData).status(200)
    })
    .then(re=>{
        userModel.updateOne({_id:req.body.userId},{$set:{timeSlot:timeSlot}})
    .exec()
    .then(resp=>{
        // res.send(resp).status(200)
    })
    })
    

}); 

router.get('/',function(req,res){
    mentorModel.find()
    .exec()
    .then(data=>{
        res.send(data).status(200);
    })
});
   

router.put('/newtimeslot',function(req,res){
    const id=req.body.mentorId
    const time=(req.body.timeSlot)
    console.log(req.body)
    mentorModel.updateOne({_id:id},{$push:{timeSlots:time}})
    .exec()
    .then(mentor=>{
        res.send(mentor).status(200);
    })
    userModel.findOne({timeSlot:time})
    .exec()
    .then(resp=>{
        if(resp.length>0)
        {
            userModel.updateOne({_id:resp._id},{$set:{found:true}})
            .exec()
            .then(found=>{
                res.send(found)
            })
        }
        else{

        }
    })
})


    router.put('/uploadImage',upload.single('profileimage'),function(req,res){
        if(req.file){
            console.log('Uploading File....');
            let profileimage = req.file.filename;
            let id=req.body.mentorId
            mentorModel.updateOne({_id:id},{$set:{profileimage:profileimage}})
            .exec()
            .then(mentor=>{
                res.send(mentor)
            })

        } else{
            console.log('No File Uploaded....');
            res.send("no image to upload")
        }
    })


    router.post('/',function(req,res){
        
        const newData= new mentorModel({
        _id: new mongoose.Types.ObjectId(),
        name :req.body.name,
        age: req.body.age,
        email: req.body.email,
        password:bcryptjs.hashSync(req.body.password,10),
        address: req.body.address,
        city: req.body.city,
        //gender: req.body.gender,
        contact: req.body.contact,
        
        qualification: req.body.qualification
    });
    mentorModel.find({email:req.body.email})
    .exec()
    .then(mentor=>{
        if(mentor.length>0){
            res.send("mentor already exists").status(400);
        }
        else{
            newData.save();
            res.send("mentor created successfully").status(201);
        }
    })
})
//  
router.post('/login',function(req,res){
    mentorModel.findOne({email:req.body.email})
    .exec()
    .then(mentor=>{
        console.log(req.body)
        if(mentor==null)
        res.send("Auth failed").status(401);
        else
        {
            if(bcryptjs.compareSync(req.body.password,mentor.password) )
            {
                const token=jwt.sign({
                    email:mentor.email,
                    _id:mentor.id
                },'secret',
                {
                    expiresIn: '24h'
                })
                res.json({
                    "message":"Auth Successful",
                    "token":token,
                    "mentorId":mentor._id
                }).status(200);
            }
            else{
                res.send("Auth failed").status(401);
            }
        }
        
    })
})

//Updating the email of user with Id , note the path - do it likewise 
router.put('/updateEmail',function(req,res){
    const id = req.body.mentorId;
    const newEmail =req.body.email;
    mentorModel.updateOne({_id:id},{$set:{email:newEmail}})
    .exec()
    .then(data=>{
        res.send(data).status(200);
    })
});
      //Updating the address of mentor with Id , note the path - do it likewise 
      router.put('/updateAddress',function(req,res){
        const id = req.body.mentorId;
        const newAddress =req.body.address;
        mentorModel.updateOne({_id:id},{$set:{address:newAddress}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });
    
      //Updating the qualification of user with Id , note the path - do it likewise 
      router.put('/updateQualification',function(req,res){
        const id = req.body.mentorId;
        const newQualifaction =req.body.qualifaction;
        mentorModel.updateOne({_id:id},{$set:{qualification:newQualifaction}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });

     //Updating the password of user with Id , note the path - do it likewise 
     router.put('/updatePassword',function(req,res){
        const id = req.body.mentorId;
        const newPassword =req.body.password;
        mentorModel.updateOne({_id:id},{$set:{password:newPassword}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });
    
    
       //Updating the address of user with Id , note the path - do it likewise 
       router.put('/updateContact',function(req,res){
        const id = req.body.mentorId;
        const newContact =req.body.contact;
        mentorModel.updateOne({_id:id},{$set:{contact:newContact}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });
    

//deleting the record of one user with Id 
router.delete('/:mentorId',function(req,res){
    const id = req.params.mentorId;
    mentorModel.deleteOne({_id:id})
    .exec()
    .then(data=>{
        res.send(data).status(200);
    })
});



module.exports=router;



