const path = require('path');
const express = require('express');

const router = express.Router();

const rootdir = require('../utils/path')

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootdir, 'views', 'shop.html'));

    // console.log('In another-1 middleware!');
    // res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;
