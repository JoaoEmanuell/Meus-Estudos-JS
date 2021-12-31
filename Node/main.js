const express = require("express");
const app = express();

// Routes

app.get("/", function(req, res) {
    res.sendFile(`${__dirname}/templates/html/index.html`);
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});