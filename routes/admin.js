const express = require('express');
const router = express.Router();
 
router.get('/add-product', (req, res, next) => {
    console.log('Add-Product route, In the middleware!');
    res.send('<form action="/product" method="POST"><input type="text" name="massage"><button type="submit"> Add product</button></form>');
    
    // next(); // Allows the request to continue to the next middleware in line
});

router.post('/product', (req, res, next) => {
    // console.log(`Product route, In the middleware! | a massage: ${req.body.massage}`);
    console.log(req.body);
    res.redirect('/');
    // res.send('<h1>Product added!</h1>');
});

module.exports = router;
