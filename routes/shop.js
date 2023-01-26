const path = require('path');
const express = require('express');

const router = express.Router();

const rootdir = require('../utils/path')
const adminData = require('./admin')

router.get('/', (req, res, next) => {
    console.log("shop.js", adminData.products);
    res.render('shop', { prods: adminData.products, docTitle: "Mehra shop", path: '/'});
});

module.exports = router;
