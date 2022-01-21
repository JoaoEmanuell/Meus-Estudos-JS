const express = require("express");
const app = express();
const connection = require("./source/SQL/connection.js");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./source/SQL/post.js");

// Config

    // Body Parser
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

    // Template Engine
        app.engine("handlebars", handlebars({ defaultLayout: "main" }));
        app.set("view engine", "handlebars");

// Routes

app.get('/', function(req, res) {
    res.render("home");
});

app.get('/cad', function(req, res) {
    res.render('form');
});

app.post('/visualize', function(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    if (title == "" || content == "") {
        res.send("Preencha todos os campos");
    }
    else {
        // Create a new post
        Post.create({
            title : title,
            content : content
        }).then(function() {
            // If success, redirect to home
            res.redirect('/');
        }).catch(function(err) {
            // If error, error message
            res.send(`Erro ao adicionar post ${err}`);
        })};
});

// Execute
app.listen(8081, function(){
    console.log("Server is running on port 8081");
});