// Imports

const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// Config

    // Body Parser

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Template Engine

    app.engine('handlebars', handlebars({defautLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }}))
    app.set('view engine', 'handlebars')

// Routes

// Execute
app.listen(8081, () =>{
    console.log("Server is running in http://localhost:8081");
});