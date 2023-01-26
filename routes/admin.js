const path = require('path');

const express = require('express');
const router = express.Router();

const rootdir = require('../utils/path')

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {

    res.sendFile(path.join(rootdir, 'views', 'add-product.html'));

    // console.log('Add-Product route, In the middleware!');
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="massage"><button type="submit"> Add product</button></form>');
    
    // next(); // Allows the request to continue to the next middleware in line
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    // console.log(`Product route, In the middleware! | a massage: ${req.body.massage}`);
    console.log("this the post", req.body);
    res.redirect('/');
    // res.send('<h1>Product added!</h1>');
});

module.exports = router;
