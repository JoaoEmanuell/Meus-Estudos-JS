const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./admin/index');
});

router.get('/posts', (req, res) => {
    res.send('Admin Posts');
});

router.get('/categories', (req, res) => {
    res.render('./admin/categories');
});

router.get('/addcategories', (req, res) => {
    res.render('./admin/addcategories');
})
module.exports = router;