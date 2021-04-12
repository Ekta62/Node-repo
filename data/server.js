var express = require('express');
var bodyparser=require('body-parser');
var ejs = require('ejs');
var app = express();
app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('../views/form');
});

app.post('/table.ejs',(req,res)=>{
    var name=req.body.username;
    var email=req.body.email;
    var age=req.body.age;
    var location=req.body.location;
    var profile=req.body.profile;
    res.send("Name:" +name+ ",Email:" +email+ ",Age:" +age+ ",Location" +location+ ",Profile" +profile)
});

app.listen(3200,(err)=>{
    if(err){
        console.log("Error" + err);
    }
    else{
        console.log("Server Runs");
    }
});