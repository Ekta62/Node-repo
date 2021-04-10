var express=require('express');
 var bodyparser=require('body-parser');
var app=express();
//for file uploding use multer
var multer=require('multer');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
        res.sendFile(__dirname+"/views/product.html");
 })

app.post('/getData',(req,res)=>{
     var name=req.body.productname;
     var price=req.body.price;
     var quantity=req.body.quantity;
     var bill=req.body.price*quantity;
     res.send("ProductName:" +name+ ",Price:" +price+ ",Quantity:" +quantity+ ",bill" +bill)
 })
 

//File Upload 
app.get('/uploadfile',(req,res)=>{
    res.sendFile(__dirname +"/views/product.html");
});
var st=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
var fileupload=multer({storage:st}).single('image');
app.post('/upload',(req,res)=>{
    fileupload(req,res,(err)=>{
        if(err){
            console.log("File Uploading Failed" +err);
            res.send(err);
        }
        else{
            console.log("File Uploaded Successfully");
            res.send("File Uploaded Successfully");
        }
    })
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server is running at http://localhost:3000");
    }
})