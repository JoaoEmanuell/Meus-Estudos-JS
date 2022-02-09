const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
require("../models/Post");
const Category = mongoose.model("Categorys");
const CategoryValidation = require("../validations/CategoryValidation");
const Posts = mongoose.model("Posts");
const PostValidation = require("../validations/PostValidation");

router.get('/', (req, res) => {
    res.render('./admin/index');
});

router.get('/posts', (req, res) => {
    Posts.find().sort({date : 'desc'}).populate("category").lean().exec().then((posts) => {
        res.render('./admin/posts', {posts : posts});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os posts");
        res.redirect('/admin');
    });
});

router.get('/posts/add/', (req, res) => {
    Category.find().sort({date : 'desc'}).lean().exec().then(categories => {
        res.render('./admin/posts_new', { categories: categories });
    }).catch(err => {
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect('/admin');
    });
});

router.post('/posts/new/', (req, res) => {
    const new_post = PostValidation(req.body);
    if (new_post.status) {
        console.log(`Post invalido : ${new_post.erros[0].text}`);
        req.flash("error_msg", new_post.erros[0].text);
        res.redirect('/admin/posts/add');
    } else {
        Category.findOne({ _id: new_post.post.category }).then(category => {
            const post = {
                title: new_post.post.title,
                slug: new_post.post.slug,
                descb: new_post.post.descb,
                content: new_post.post.content,
                category: new_post.post.category,
            };
            new Posts(post).save().then(() => {
                req.flash("success_msg", "Post criado com sucesso");
                res.redirect('/admin/posts/add');
    
            }).catch(err => {
                console.log(`Erro ao salvar post: ${err}`);
                req.flash("error_msg", `Houve um erro ao salvar o post : ${err}`);
                res.redirect('/admin/posts/add');
            });
        }).catch(err => {
            console.log(`Erro categoria: ${err}`);
            req.flash("error_msg", "Categoria não encontrada");
            res.redirect('/admin/posts/add');
        });
    };
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