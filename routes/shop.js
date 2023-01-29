const path = require('path');
const express = require('express');

const router = express.Router();

const rootdir = require('../utils/path')
const adminData = require('./admin')

router.get('/', (req, res, next) => {
    const products = adminData.products;
    console.log("shop.js", adminData.products);
    // res.render('shop', { prods: adminData.products, docTitle: "Mehra shop", path: '/'});
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
});

module.exports = router;
