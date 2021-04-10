var http = require('http');
var myfunc= require('./myfunction.js');
/*http.createServer(function(req,res){
res.writeHead(200,{'content-Type':"text/html"});
res.write("<h1>Welcome to  node sever</h1>");
res.end();
}).listen(3000);*/
myfunc.test.add();
console.log("Addition is : " + (myfunc.add(5,7)));