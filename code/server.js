var express = require('express');
var bodyparser = require('body-parser');
var route = require("./routes/userroutes.js");
var app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use('/',route);
app.listen(3000,(err)=>{
    if(err){
        console.log("Error occured" +err);
    }
    else{
        console.log("Server Works");
    }
});