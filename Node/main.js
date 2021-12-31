const express = require("express");
const app = express();

// Routes

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.get("/hello/:name", function(req, res) {
    res.send(`<h1>Hello ${req.params.name}!</h1>`);
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});