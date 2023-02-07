const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => { // This is the controller for the products page
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', { // This is the view for the products page
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err))  
};

exports.getProduct = (req, res, next) => { // This is the controller for the product detail page
  const prodId = req.params.productId;
  Product.findById(prodId) //replace findById with findByPk
    .then(product => {
        console.log(product);
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => { // This is the controller for the index page
  Product.find()
    .then(product => {
      res.render('shop/index', {
        prods: product,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => console.log(err))    
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => { 
  const prodId = req.body.productId; 

  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart')
    })
    
};

exports.postCartDeleteProduct = (req, res, next) => {  // This is the controller for the cart page
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId)
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err)) 
};

exports.postOrder = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return {quantity: i.quantity, product: {...i.productId}}
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      return order.save()
    })
    .then(result =>{
      req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => { // This is the controller for the orders page
  Order.find({'user.userId': req.user._id})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => {
    console.log(err);
  })
};

