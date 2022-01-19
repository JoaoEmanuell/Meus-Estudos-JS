const express = require("express");
const app = express();
const connection = require("./source/SQL/connection.js");
const exphbs = require("express-handlebars");
const handlebars = exphbs.create({ defaultLayout: "main" });
const bodyParser = require("body-parser");

// Config

    // Body Parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

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

app.post('/visualize', function(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    res.send(`<p>Title : ${title}</p><p>Content : ${content}</p>`);
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});