const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const multer = require('multer');
const userModel=require('../models/userModel');
const bcryptjs = require('bcryptjs'); // Encryption
const jwt=require('jsonwebtoken');
var upload = multer({dest: './public/upload'});


// router.get('/'),function(req,res){

// }

router.post('/getuser',function(req,res){
    // s.send("User's Home").status(200);
    const id=req.body.userId
    console.log("asd",req.body)
    userModel.findOne({_id:id})
    .exec()
    .then(userData=>{
    
        res.send(userData).status(200)
    })
});




router.post('/imgupload',upload.single('profileimage'),function(req,res){
    console.log("zxc",req)
    if(req.file){
        console.log('Uploading File....');
        let profileimage = req.file.filename;
        let id=req.body.userId
        mentorModel.updateOne({_id:id},{$set:{profileimage:profileimage}})
        .exec()
        .then(user=>{
            res.send(user)
        })

    } else{
        console.log('No File Uploaded....');
        res.send("no image to upload")
    }
})





   

router.post('/',function(req,res){

    console.log(req)
    const newData= new userModel({
        _id: new mongoose.Types.ObjectId(),
        name :req.body.name,
        age: req.body.age,
        email: req.body.email,
        password:bcryptjs.hashSync(req.body.password,10),
        address: req.body.address,
        city: req.body.city,
        //gender: req.body.gender,
        contact: req.body.contact,
        stage: req.body.stage

    });
    userModel.find({email:req.body.email})
.exec()
.then(users=>{
    if(users.length>0){
        res.send("user already exists").status(400);
    }
    else{
        newData.save();
        res.send("User created successfully").status(201);
    }
})
})
      
router.put('/stageUpdate',function(req,res){
    const newStage=req.body.stage
    const userId=req.body.userId
    userModel.updateOne({_id:userId},{$set:{stage:newStage}})
    .exec()
    .then(updatedStage=>{
        res.send(updatedStage).status(200)
    })
    .catch(err=>{
        res.send(err).status(400)
    })
})



//Updating the email of user with Id , note the path - do it likewise 
router.put('/updateEmail',function(req,res){
    const id = req.body.userId;
    const newEmail =req.body.email;
    userModel.updateOne({_id:id},{$set:{email:newEmail}})
    .exec()
    .then(data=>{
        res.send(data).status(200);
    })
});
      //Updating the address of user with Id , note the path - do it likewise 
      router.put('/updateAddress',function(req,res){
        const id = req.body.userId;
        const newAddress =req.body.address;
        userModel.updateOne({_id:id},{$set:{address:newAddress}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });

       //Updating the address of user with Id , note the path - do it likewise 
       router.put('/updateContact',function(req,res){
        const id = req.body.userId;
        const newContact =req.body.contact;
        userModel.updateOne({_id:id},{$set:{contact:newContact}})
        .exec()
        .then(data=>{
            res.send(data).status(200);
        })
    });
    
          //Updating the password of user with Id , note the path - do it likewise 
          router.put('/updatePassword',function(req,res){
            const id = req.body.userId;
            const newPassword =req.body.password;
            userModel.updateOne({_id:id},{$set:{password:newPassword}})
            .exec()
            .then(data=>{
                res.send(data).status(200);
            })
        });
        
//deleting the record of one user with Id 
router.delete('/:userId',function(req,res){
    const id = req.params.userId;
    userModel.deleteOne({_id:id})
    .exec()
    .then(data=>{
        res.send(data).status(200);
    })
});


router.post('/login',function(req,res){
    console.log("hello",req)
    
    userModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user==null)
        res.send("Auth failed").status(400);
        else
        {
            if(bcryptjs.compareSync(req.body.password,user.password) )
            {
                const token=jwt.sign({
                    email:user.email,
                    _id:user.id
                },'secret',
                {
                    expiresIn: '24h'
                })
                res.json({
                    "message":"Auth Successful",
                    "userId":user._id,
                    "token":token
                }).status(200);
            }
            else{
                res.send("Auth failed").status(401);
            }
        }
        
    })
})



module.exports=router;



