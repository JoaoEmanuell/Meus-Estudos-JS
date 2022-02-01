const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("Categorys");

router.get('/', (req, res) => {
    res.render('./admin/index');
});

router.get('/posts', (req, res) => {
    res.send('Admin Posts');
});

router.get('/categories', (req, res) => {
    Category.findAll({
        order : [['date', 'desc']]
    }).then((categories) => {
        console.log(categories);
        res.render('./admin/categories', {categories : categories});
    });
});

router.get('/addcategories', (req, res) => {
    res.render('./admin/addcategories');
});

router.post('/categories/new', (req, res) => {
    const new_category = {
        name : String(req.body.name).toUpperCase(),
        slug : String(req.body.slug).toLowerCase().replace(' ', '-'),
    }

    new Category({
        name : new_category.name,
        slug : new_category.slug
    }).save().then(() => {
        res.redirect('/admin/categories');
    }
    ).catch(err => {
        res.send(`Erro ao cadastrar categoria ${err}`);
    }
    );
});
module.exports = router;