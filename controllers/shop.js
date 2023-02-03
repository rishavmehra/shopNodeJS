const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => { // This is the controller for the products page
  Product.fetchAll()
  .then(([rows, fieldData]) => {  
    res.render('shop/product-list', { // This is the view for the products page
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  
};

exports.getProduct = (req, res, next) => { // This is the controller for the product detail page
  const prodId = req.params.productId;
  Product
    .findById(prodId)
    .then(
      ([product]) => {
        console.log(product);
        res.render('shop/product-detail', {
          product: product[0],
          pageTitle: product.title,
          path: '/products'
        });
      })
    .catch(err => console.log(err));
  
};



exports.getIndex = (req, res, next) => { // This is the controller for the index page
  Product.fetchAll() // this the promise that gets the product data
    .then(([rows, fieldData]) => {  
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
    
};

exports.getCart = (req, res, next) => { // This is the controller for the cart page
  Cart.getCart(cart => {
    Product.fetchAll(products => { // This is the loop that gets the product data
      const cartProducts = [];
      for (product of products) { // This is the loop that adds the product data to the cart
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', { // This is the view for the cart page
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => { // This is the controller for the cart page
  const prodId = req.body.productId; 
  Product.findById(prodId, product => { // This is the loop that gets the product data
    Cart.addProduct(prodId, product.price); // This is the loop that adds the product data to the cart
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {  // This is the controller for the cart page
  const prodId = req.body.productId;
  Product.findById(prodId, product => { // This is the loop that gets the product data
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => { // This is the controller for the orders page
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => { // This is the controller for the checkout page
  res.render('shop/checkout', {
    path: '/checkout', // This is the view for the checkout page
    pageTitle: 'Checkout' 
  });
};
