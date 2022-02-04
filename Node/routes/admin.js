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
    Category.find({}).sort({date : 'desc'}).lean().exec().then((categories) => {
        res.render('./admin/categories', {categories : categories});
    }).catch(err => {
        req.flash('error_msg', `Erro ao listar as categorias`);
        res.redirect('/admin/categories');
    }
    );
});

router.get('/addcategories', (req, res) => {
    res.render('./admin/addcategories');
});

router.post('/categories/new', (req, res) => {
    const new_category = {
        name : String(req.body.name).toUpperCase(),
        slug : String(req.body.slug).toLowerCase().replace(' ', '-'),
    }

    const erros = [];

    if(!new_category.name || typeof new_category.name.length == undefined || new_category.name.length == null) {
        erros.push({text : 'Nome inválido'});
    };

    if(!new_category.slug || typeof new_category.slug.length == undefined || new_category.slug.length == null) {
        erros.push({text : 'Slug inválido'});
    };

    if (new_category.slug < 3) {
        erros.push({text : 'Slug muito curto'});
    };

    if (erros.length > 0) {
        res.render('./admin/addcategories', {erros : erros});
    } else {
        new Category({
            name : new_category.name,
            slug : new_category.slug
        }).save().then(() => {
            req.flash('success_msg', 'Categoria criada com sucesso');
            res.redirect('/admin/categories');
        }
        ).catch(err => {
            req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente');
            res.redirect('/admin/categories');
        }
        )
    };
});
module.exports = router;