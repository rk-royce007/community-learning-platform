// var requestList

// var mentorDetails
// var mentorsRequestList
// var usersList



axios({
    method:'post',
    url:'http://localhost:3000/appointments/mentorsRequestList',
    data:{
        mentorId:localStorage.getItem("mentorId")
    }
})
.then(resp=>{
    console.log("bhar",resp.data)
    let userList=resp.data      
    let listToUpdate=document.getElementById("pendingList")
        
        var cntr=0;
        console.log("lakra",userList.length)
        if(userList.length>0)
        {
            userList.forEach(element=>{
                let userId=element.userId
                axios({
                    method:'post',
                    url:'http://localhost:3000/users/getuser',
                    data:{
                        userId:userId
                    }
                })
                .then(userRes=>{
                    let row_div=document.createElement("div")
                    row_div.className="row"
                    
                    let col_div1=document.createElement("div")
                    col_div1.className="col-md-6"
                    let w3_div=document.createElement("div")
                    w3_div.className="w3-container"
                    w3_div.innerText=userRes.data.name
                    col_div1.appendChild(w3_div)
                    row_div.appendChild(col_div1)
                    
                    
                    let col_div2=document.createElement("div")
                    col_div2.className="col-md-6"
                    let check=document.createElement("input")
                    check.value=element._id
                    
                    check.type="checkbox"
                    check.name="approve"
                    col_div2.appendChild(check)
                    row_div.appendChild(col_div2)
        
                    document.getElementById("pending-appointment").appendChild(row_div)
                    cntr++;
                    if(cntr===userList.length)
                    {
                        console.log("surya")
                        let row_but=document.createElement("div")
                        row_but.className="row"
                        let col_but=document.createElement("div")
                        col_but.className="col-md-6"
                        let but=document.createElement("button")
                        but.type="button"
                        but.onclick=function(){
                            var list=document.querySelectorAll('input[type=checkbox]:checked')
                            list.forEach(elem=>{
                                console.log(elem.value)
                                axios({
                                    method:'put',
                                    url:'http://localhost:3000/appointments/changeStatus',
                                    data:{
                                        appointmentId:elem.value
                                    }
                                })
                                .then(response=>{
                                    console.log(response)
                                })
                            })
                            
                            console.log("vishallakra",document.querySelectorAll('input[type=checkbox]:checked'))
                        }
                        but.innerText="Approve"
                        col_but.appendChild(but)
                        row_but.appendChild(col_but)
                        document.getElementById("pending-appointment").appendChild(row_but)
            
                    }
                })
        
            })
        }
        else
        {
            let row_div=document.createElement("div")
                    row_div.className="row"
                    
                    let col_div1=document.createElement("div")
                    col_div1.className="col-md-6"
                    let w3_div=document.createElement("div")
                    w3_div.className="w3-container"
                    w3_div.innerText="You have no pending Requests"
                    col_div1.appendChild(w3_div)
                    row_div.appendChild(col_div1)
                    document.getElementById("pending-appointment").appendChild(row_div)
        }

        
        

})
    



    
            

    
    



console.log("asd",localStorage.getItem("mentorId"))
axios({
    method:'post',
    url:'http://localhost:3000/mentors/getmentor',
    data:{
        mentorId:localStorage.getItem("mentorId")
    }
})
.then(function(res){
    mentorDetails=res.data
    console.log("asdzxc",mentorDetails)
    console.log()
    document.getElementById("name").innerText=mentorDetails.name;
    document.getElementById("name1").innerText=mentorDetails.name;
    document.getElementById("address").innerText=mentorDetails.address;

    document.getElementById("email").innerText=mentorDetails.email;

    document.getElementById("contact").innerText=mentorDetails.contact;
    //var stageReached=userDetails.stage
    //var stage=document.getElementById("completedList")


    var mentorTimeSlots=mentorDetails.timeSlots;
    let el=document.getElementById("showtimeslots")
    console.log(mentorTimeSlots)
    mentorTimeSlots.forEach(element => {
        let li=document.createElement("li")
        let str=element.substring(0,10)
        console.log("zxczxc",str)
        li.appendChild(document.createTextNode(str))
        el.appendChild(li)

    });

    
    

})
.catch(function(err){
    console.log(err)
})


var userList;

axios({
    method:'post',
    url:'http://localhost:3000/appointments/mentorList',
    data:{
        mentorId:localStorage.getItem("mentorId")
    }
})
.then(function(res){
    console.log("asdasdasd",res)
    var userList=res.data;
    userList.forEach(element => {
        axios({
            method:"post",
            url:"http://localhost:3000/users/getuser",
            data:{
                userId:element.userId
            }
        })
        .then(res=>{
            console.log("zxc",res)
            let li=document.createElement("li").appendChild(document.createTextNode(res.data.name))
        document.getElementById("ul_appointments").appendChild(li)
        document.getElementById("ul_appointments").appendChild(document.createElement("br"))
        })


        
    });

})
.catch(function(err){
    console.log(err)
})

// axios({
//     method:'get',
//     url:'http://localhost:3000/appointments/mentorsRequestList',
//     data:{
//         mentorId:mentorId
//     }
// })
// .then(function(res){
//     mentorsList=res
// })
// .catch(function(err){
//     console.log(err)
// })

// axios({
//     ethod:'put',
//     url:'http://localhost:3000/mentors/'
// })



// var appointmentId
// axios({
//     method:'put',
//     url:'http://localhost:3000/appointments/changeStatus',
//     data:{
//         appointmentId:appointmentId
//     }
// })
// .then(function(res){
//     console.log(res)
// })
// .catch(function(err){
//     console.log(err)
// })


// var stageUpdate
// var newStage
// axios({
//     method:'put',
//     url:'http://localhost:3000/users/stageUpdate',
//     data:{
//         userId:userId,
//         stage:newStage
//     }
// })

var email='user1@gmail.com'
var password='user1'
var token
var userId
