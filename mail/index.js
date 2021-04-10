var express = require('express');
var bodyparser = require('body-parser'); 
var apiroutes=require('./routes/userroutes');
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/',apiroutes);
app.listen(3000,(err)=>{
    if(err){
        console.log("Error Occured" +err);
    }
    else{
        console.log("Server Works");
    }
});