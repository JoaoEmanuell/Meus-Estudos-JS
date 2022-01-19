const express = require("express");
const app = express();
const connection = require("./source/SQL/connection.js");
const exphbs = require("express-handlebars");
const handlebars = exphbs.create({ defaultLayout: "main" });

// Config
    // Template Engine
        app.engine("handlebars", handlebars.engine);
        app.set("view engine", "handlebars");

// Routes

app.get('/', function(req, res) {
    res.send("home");
});

app.get('/cad', function(req, res) {
    res.render('form');
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});