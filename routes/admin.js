const path = require('path');

const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/admin')


 
// /admin/add-product => GET
router.get('/add-product', adminControllers.getAddProduct );

// /admin/products => GET
router.get('/products', adminControllers.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminControllers.postAddProducts);

router.get('/edit-product/:productId', adminControllers.getEditProduct);

module.exports = router
