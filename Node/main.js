const express = require("express");
const app = express();

// Routes

app.get("/", function(req, res) {
    res.send("Hello World!");
});

app.get("/home", function(req, res) {
    res.send("Hello Home!");
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});