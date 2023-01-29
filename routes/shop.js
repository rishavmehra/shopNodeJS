const path = require('path');
const express = require('express');

const router = express.Router();

const productControllers = require('../controllers/products')

router.get('/', productControllers.getProduct);

module.exports = router;
