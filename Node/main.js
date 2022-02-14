// Imports

const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path")
const mongoose = require("./source/connection");
const session = require("express-session");
const flash = require("connect-flash");

// Routers import

const admin = require("./routes/admin");
const user = require('./routes/user');

mongoose.set('useFindAndModify', false);

// Models import

require("./models/Post");
const Posts = mongoose.model("Posts");
require("./models/Category");
const Categories = mongoose.model("Categorys");

// Config

    // Session

        app.use(session({
            secret: "secret",
            resave: true,
            saveUninitialized: true
        }));

        app.use(flash());

    // Middlewares

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });

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

    app.use('/user', user);

    app.get('/', (req, res) => {
        Posts.find().sort({date : 'desc'}).populate("category").lean().exec().then((posts) => {
            res.render('index', {posts : posts});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar os posts");
            res.redirect('/404');
        });
    });

    app.get('/categories/', (req, res) => {
        Categories.find().sort({date : 'desc'}).lean().exec().then((categories) => {
            res.render('./categories/index', {categories : categories});
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect('/404');
        });
    });

    app.get('/categories/posts/:slug', (req, res) => {
        Categories.findOne({slug : req.params.slug}).lean().exec().then((category) => {
            if(category){
                Posts.find({category : category._id}).sort({date : 'desc'}).populate("category").lean().exec().then((posts) => {
                    res.render('./categories/show', {category : category, posts : posts});
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts");
                    res.redirect('/404');
                });
            }else{
                req.flash("error_msg", "Categoria não encontrada");
                res.redirect('/404');
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect('/404');
        });
    });

    app.get('/post/read/:title', (req, res) => {
        Posts.findOne({title : req.params.title}).lean().exec().then((post) => {
            if (post) {
                res.render('./posts/show', {post : post});
            } else {
                req.flash("error_msg", "Post não encontrado");
                res.redirect('/404');
            }}).catch((err) => {
                req.flash("error_msg", "Houve um erro ao carregat o post");
                res.redirect('/404');
            });
    });

    app.get('/404', (req, res) => {
        res.render("404");
    });

// Execute
app.listen(8081, () =>{
    console.log("Server is running in http://localhost:8081");
});