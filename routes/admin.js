const path = require('path');

const express = require('express');
const router = express.Router();

const rootdir = require('../utils/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {

    // res.sendFile(path.join(rootdir, 'views', 'add-product.html'));
    res.render('add-product', {doctitle: "Add product", path: '/admin/add-product' })
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
