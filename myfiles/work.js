var http = require ('http');
http.createServer((req,res)=>{
    if(req.url=="/"){
        res.writeHead(200,{'content-Type':'text/plain'})
        res.write("This is home page");
        res.end();
    }
    else if(req.url=="/login"){
        res.writeHead(200,{'content-Type':'text/plain'})
        res.write("This is login page");
        res.end();
    }
}).listen(3000);