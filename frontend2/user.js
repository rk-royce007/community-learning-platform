


const token=localStorage.getItem("token")
const userId=localStorage.getItem("userId")
console.log(userId)
var appointmentPending;
var userDetails
var mentorsAvailable

var previousAppointments


axios({
    method:'post',
    url:'http://localhost:3000/appointments/user',
    data:{
        userId:userId
    }
    
})
.then(function(res){
    previousAppointments=res.data
    if(previousAppointments.length>0)
    {
        var prevel=document.createElement("table")
        var thead=document.createElement("thead")
        var th1=document.createElement("th")
        th1.innerText="Mentors"
        //var th2=document.createElement("th")
        

        thead.appendChild(th1)
        prevel.appendChild(thead)
        var tbody=document.createElement("tbody")
        previousAppointments.forEach(element => {
            let id=element.mentorId
            let mname;
            let prom=new Promise(function(resolve,reject){
                axios({
                    method:'post',
                    url:'http://localhost:3000/mentors/getmentor',
                    data:{
                        mentorId:id
                    }
                })
                .then(function(resp){
                    mname=resp.data.name
                console.log(resp)
                let tr=document.createElement("tr")
                let td=document.createElement("td")
                td.innerText=mname
                tr.appendChild(td)
                tbody.appendChild(tr)
                })

                resolve(1);
            })
            .then(response=>{
                prevel.appendChild(tbody)
                document.getElementById("ShowPrevAppointment").appendChild(prevel)
            })
            
            
            
        })
        

    }

})



axios({
    method:'post',
    url:'http://localhost:3000/users/getuser',
    data:{
        userId:userId
    }
    
})
.then(function(res){
    userDetails=res.data
    console.log("bharti")
    console.log(userDetails)
    
    document.getElementById("name").innerText=userDetails.name;
    document.getElementById("name1").innerText=userDetails.name;
    document.getElementById("address").innerText=userDetails.address;

    document.getElementById("email").innerText=userDetails.email;

    document.getElementById("contact").innerText=userDetails.contact;
    localStorage.setItem("city",userDetails.city)
    
    var stageReached=userDetails.stage
    var stage=document.getElementById("completedList")
    let i;
    for(i=1;i<=stageReached;i++)
    {
        stage.appendChild((document.createElement("li")).appendChild(document.createTextNode("Stage "+i)) )
        stage.appendChild(document.createElement("hr"))
        // var el=document.createElement(li).innerText="Stage"+i;
        // el.innerText="Stage"+i;
    }
    var le=document.getElementById("leftList")
    for(;i<=15;i++)
    {
        le.appendChild((document.createElement("li")).appendChild(document.createTextNode("Stage "+i)) )
        le.appendChild(document.createElement("hr"))
        
    }
    if(userDetails.found)
    {
        alert("A mentor is available. Please re-enter your time-slot")
    }

})
.catch(function(err){
    console.log(err)
})






// var token=localStorage.getItem("token")
// // console.log("zxc",userId)
// console.log(token)

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
