var http = require('http');

http.createServer(function(req, res){
    res.end("Hello World");
}).listen(8786);

console.log("Hello World");