var nodemail=require('nodemailer');
var transport = nodemail.createTransport({
  service:'gmail',
  auth:{
      user:'ektaabhagii@gmail.com',
      pass:'#3582@6284'
  }  
});
module.exports.openPage=(req,res)=>{
    res.sendFile(__dirname+"/views/form.html");
}
module.exports.sendingEmails=(req,res)=>{
    var mailOptions={
        from:"ektaabhagii@gmail.com",
        to:req.body.to,
        subject:req.body.subject,
        text:req.body.msg,
        attachments: [{
            path: './uploads/Solar.jpg'
        }],
    }
    transport.sendMail(mailOptions,(err)=>{
        if(err)
        {console.log("Error in sending emails" +err);}
        else
        {
            console.log("Mail sent");
        }
    })
}