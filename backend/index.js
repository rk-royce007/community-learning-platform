const express=require('express');
const morgan = require('morgan');
const port=3000;
const app=express();
const parser=require('body-parser');
const multer = require('multer');
const mongoose=require('mongoose');
const users=require('./routes/users'); // userRoute path
const mentors=require('./routes/mentors'); //Mentors path
const appointments=require('./routes/appointments'); //Mentors path

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://Shivam:9691@cluster0-ezk1q.mongodb.net/test?retryWrites=true",function(err){
    if(err)
    {
        console.log(err);
    }
    else{   
        console.log("Atlas Connected");
    }
});

app.use('/upload',express.static('upload'));
app.use('*',function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','*');
    res.set("Access-Control-Allow-Methods",'*')
    // res.set('Content-Type', 'image/jpg');
    next();
});

// //List all the routes here
app.use('/users',users);
app.use('/mentors',mentors);
app.use('/appointments',appointments);
// var cons = require('consolidate');
// // view engine setup
// app.engine('html', cons.swig)
// app.set('./', path.join(__dirname, './'));
// app.set('view engine', 'html');
// app.set('view engine', pug);

// app.get('/',function(req,res){
//     res.send("connection working").status(200)
// })

app.listen(port,function(){
    
    console.log(`Server Listining on ${port}`);
});