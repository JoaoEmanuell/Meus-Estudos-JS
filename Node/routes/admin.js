const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("Categorys");
const CategoryValidation = require("../validations/CategoryValidation");

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

router.get('/editcategories/:id', (req, res) => {
    Category.findOne({_id : req.params.id}).lean().exec().then((category) => {
        res.render('./admin/editcategories', {category : category});
    }).catch(err => {
        req.flash('error_msg', `Erro, categoria inexistente`);
        res.redirect('/admin/categories');
    }
    );
});

router.post('/editcategory', (req, res) => {
    const new_category = CategoryValidation({name : req.body.name, slug : req.body.slug});  
    if (new_category.status) {
        req.flash('error_msg', `${new_category.erros[0].text}`);
        res.redirect(`/admin/editcategories/${req.body.id}`);
    } else {
        Category.findOneAndUpdate({_id : req.body.id}, { name : new_category.category.name, slug : new_category.category.slug }).lean().exec().then(() => {
            req.flash('success_msg', `Categoria editada com sucesso`);
            res.redirect('/admin/categories');
        }).catch(err => {
            req.flash('error_msg', `Erro ao editar categoria`);
            res.redirect('/admin/categories');
        });
    }

});

router.get('/removecategorie/:id', (req, res) => {
    Category.deleteOne({_id : req.params.id}).then(() => {
        req.flash('success_msg', 'Categoria removida com sucesso');
        res.redirect('/admin/categories');
    }).catch(err => {
        req.flash('error_msg', 'Erro ao remover categoria');
        res.redirect('/admin/categories');
    });
});

router.post('/categories/new', (req, res) => {
    const new_category = CategoryValidation({name : req.body.name, slug : req.body.slug});  
    if (new_category.status) {
        res.render('./admin/addcategories', {erros : new_category.erros});
    } else {
        new Category({
            name : new_category.category.name,
            slug : new_category.category.slug
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