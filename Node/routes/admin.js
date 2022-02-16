// Imports

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Models import

require("../models/Category");
require("../models/Post");
const Category = mongoose.model("Categorys");
const Posts = mongoose.model("Posts");

// Validators

const CategoryValidation = require("../validations/CategoryValidation");
const PostValidation = require("../validations/PostValidation");

// Helpers

const {isAdmin} = require("../helpers/isAdmin");

router.get('/', isAdmin, (req, res) => {
    res.render('./admin/index');
});

router.get('/posts', isAdmin, (req, res) => {
    Posts.find().sort({date : 'desc'}).populate("category").lean().exec().then((posts) => {
        res.render('./admin/posts', {posts : posts});
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os posts");
        res.redirect('/admin');
    });
});

router.get('/posts/add/', isAdmin, (req, res) => {
    Category.find().sort({date : 'desc'}).lean().exec().then(categories => {
        res.render('./admin/posts_new', { categories: categories });
    }).catch(err => {
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect('/admin');
    });
});

router.post('/posts/new/', isAdmin, (req, res) => {
    const new_post = PostValidation(req.body);
    if (new_post.status) {
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
                res.redirect('/admin/posts/');
    
            }).catch(err => {
                req.flash("error_msg", `Houve um erro ao salvar o post : ${err}`);
                res.redirect('/admin/posts/add');
            });
        }).catch(err => {
            req.flash("error_msg", "Categoria não encontrada");
            res.redirect('/admin/posts/add');
        });
    };
});

router.get('/post/edit/:id', isAdmin, (req, res) => {
    Posts.findOne({ _id: req.params.id }).lean().exec().then(post => {
        Category.find().sort({date : 'desc'}).lean().exec().then(categories => {
            res.render('./admin/posts_edit', { post: post, categories: categories });
        }).catch(err => {
            req.flash("error_msg", "Houve um erro ao listar as categorias");
            res.redirect('/admin');
        });
    });
});

router.post('/post/edit_post', isAdmin, (req, res) => {
    const new_post = PostValidation(req.body);
    if (new_post.status) {
        req.flash("error_msg", new_post.erros[0].text);
        res.redirect('/admin/posts/');
    } else {
        Category.findOne({ _id: new_post.post.category }).then(category => {
            const post = {
                title: new_post.post.title,
                slug: new_post.post.slug,
                descb: new_post.post.descb,
                content: new_post.post.content,
                category: new_post.post.category,
            };
            Posts.findOneAndUpdate({_id : req.body.id}, post).exec().then(() => {
                req.flash("success_msg", "Post editado com sucesso");
                res.redirect('/admin/posts/');
    
            }).catch(err => {
                req.flash("error_msg", `Houve um erro ao editar o post : ${err}`);
                res.redirect(`/admin/posts/edit/${req.body.id}`);
            });
        }).catch(err => {
            req.flash("error_msg", "Categoria não encontrada");
            res.redirect('/admin/posts/');
        });
    };
});

router.post('/post/delete/', isAdmin, (req, res) => {
    Posts.deleteOne({ _id: req.body.id }).then(() => {
        req.flash("success_msg", "Post deletado com sucesso");
        res.redirect('/admin/posts/');
    }).catch(err => {
        req.flash("error_msg", `Houve um erro ao deletar o post : ${err}`);
        res.redirect('/admin/posts/');
    });
});

router.get('/categories', isAdmin, (req, res) => {
    Category.find({}).sort({date : 'desc'}).lean().exec().then((categories) => {
        res.render('./admin/categories', {categories : categories});
    }).catch(err => {
        req.flash('error_msg', `Erro ao listar as categorias`);
        res.redirect('/admin/categories');
    }
    );
});

router.get('/addcategories', isAdmin, (req, res) => {
    res.render('./admin/addcategories');
});

router.get('/editcategories/:id', isAdmin, (req, res) => {
    Category.findOne({_id : req.params.id}).lean().exec().then((category) => {
        res.render('./admin/editcategories', {category : category});
    }).catch(err => {
        req.flash('error_msg', `Erro, categoria inexistente`);
        res.redirect('/admin/categories');
    }
    );
});

router.post('/editcategory', isAdmin, (req, res) => {
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

router.get('/removecategorie/:id', isAdmin, (req, res) => {
    Category.deleteOne({_id : req.params.id}).then(() => {
        req.flash('success_msg', 'Categoria removida com sucesso');
        res.redirect('/admin/categories');
    }).catch(err => {
        req.flash('error_msg', 'Erro ao remover categoria');
        res.redirect('/admin/categories');
    });
});

router.post('/categories/new', isAdmin, (req, res) => {
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