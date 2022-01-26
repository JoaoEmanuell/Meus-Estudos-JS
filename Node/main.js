// Imports

const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const path = require("path")

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

    // Public
    
    app.use(express.static(path.join(__dirname, 'public')));
// Routes
    app.use('/admin', admin);

// Execute
app.listen(8081, () =>{
    console.log("Server is running in http://localhost:8081");
});