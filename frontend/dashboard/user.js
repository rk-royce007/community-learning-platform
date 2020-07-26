
var appointmentPending;
var userDetails
var mentorsAvailable
var mentorChoosen
// axios({
//     method:'get',
//     url:'http://localhost:3000/users/getuser',
//     data:{
//         userId:userId
//     }
    
// })
// .then(function(res){
//     console.log(res)
// })
// .catch(function(err){
//     console.log(err)
// })

var timeSlot;
// axios({
//     method:'get',
//     url:'http://localhost:3000/mentors/timeSlot',
//     data:{
//         timeSlot:timeSlot
//     }
// })
// .then(function(res){
//     mentorsAvailable=res.data;
//     console.log(res)
// })
// .catch(function(err){
//     console.log(err)
// })


// axios({
//     method:'post',
//     url:"http://localhost:3000/appointments/",
//     data:{
//         userId:userId,
//         timeSlot:timeSlot,
//         mentorId:mentorChoosen
//     }
// })
// .then(function(res){
//     console.log(res)
// })
// .catch(function(err){
//     console.log(err)
// })

var token=localStorage.getItem("token")
// console.log("zxc",userId)
console.log(token)

// var rating=4
// axios({
//     method:'put',
//     url:"http://localhost:3000/appointments/giveRating",
//     headers:{Autorization:'Bearer' + token},
//     data:{
//         appointmentId:appointmentId,
//         rating:rating
//     }
// })
// .then(function(res){
//     console.log(res.data)
// })
// .catch(function(err){
//     console.log(err)
// })
