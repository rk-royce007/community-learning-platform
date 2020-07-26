//const axios=require('axios')

loginusertype=1;

var email="user1@gmail.com"
var password="user1"

// axios({
//     method:'get',
//     url:'http://localhost:3000/'
//     })
//     .then(function(response){
//         console.log(response)
//     })
//     .catch(function(err){
//         console.log(err)
//     })

if(loginusertype===1)
    {
   axios({
       method:'post',
       url:'http://localhost:3000/users/login',
       data:{
           email:email,
           password:password
       }
   })
   .then(function(response){
       if(response.data!=="Auth failed")
       {
        //console.log(response)
        localStorage.setItem("token",response.data.token)
        //userId=response.data.userId
        //console.log(token)
        //console.log(userId)
        window.location.href="./dashboard/user.html"
       }
       else
       {
           //when auth fails
           console.log("failed")
       }
       
       
   })
   .catch(function(err){
       console.log("asd",err)
   })
   
}
// else if(loginusertype===2)
// {
//     axios({
//         method:'post',
//         url:'http://localhost:3000/mentors/login',
        
//         data:{
//             email:email,
//             password:password
//         }
//     })
//     .then(function(response){
//         console.log(response.data.message)
//         token=response.data.token
//         mentorId=response.data.userId
//         console.log(token)
//         console.log(mentorId)
        
//     })
    
// }


// if(registerUserType===1)
// {

//     axios({
//         method:'post',
//         url:'http://localhost:3000/users',
//         data:{
//             name:name,
//             age:age,
//             emailId:emailId,
//             password:password,
//             address:address,
//             city:city,
//             gender:gender,
//             contact:contact
//         }
//     })
//     .then(function(res){
//         console.log(res)
//     })
//     .catch(function(err){
//         console.log(err)
//     })

// }
// else if(registerUserType==2){

//     axios({
//         method:'post',
//         url:'http://localhost:3000/mentors',
//         data:{
//             name:name,
//             age:age,
//             emailId:emailId,
//             password:password,
//             address:address,
//             city:city,
//             gender:gender,
//             contact:contact,
//             qualification:qualification
//         }
//     })
//     .then(function(res){
//         console.log(res)
//     })
//     .catch(function(err){
//         console.log(err)
//     })
// }






