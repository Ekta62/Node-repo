var express = require('express');
var ejs = require('ejs');
var app = express();
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    var userdetails={
        name:'EKTA',
        email:'ektaa@gmail.com'
    }
    res.render('../views/index',{data:userdetails});
});
const port = process.env.PORT || 3000;
app.listen(port,(err)=>{
    if(err){
        console.log("Error Occured" + err);
    }
    else{
        console.log("Server is running at https:localhost:" + port);
    }
});