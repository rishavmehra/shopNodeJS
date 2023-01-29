const path = require('path');

const express = require('express');
const router = express.Router();

const rootdir = require('../utils/path');

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {

    // res.sendFile(path.join(rootdir, 'views', 'add-product.html'));
    // res.render('add-product', {doctitle: "Add product", path: '/admin/add-product' })
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
