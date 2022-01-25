const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Admin Page');
});

router.get('/posts', (req, res) => {
    res.send('Admin Posts');
});

router.get('/categories', (req, res) => {
    res.send('Admin categories');
});
module.exports = router;