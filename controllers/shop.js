const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => { // This is the controller for the products page
  Product.fetchAll()
    .then(product => {
      res.render('shop/product-list', { // This is the view for the products page
        prods: product,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err))  
};

exports.getProduct = (req, res, next) => { // This is the controller for the product detail page
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findById(prodId) //replace findById with findByPk
    .then(
      product => {
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
  Product.fetchAll()
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
  .getCart()
  .then(cart => {
    return cart
      .getProducts()
      .then(products=>{
        res.render('shop/cart', { // This is the view for the cart page
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
      .catch(err =>
        console.log(err))
  })
  .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => { 
  const prodId = req.body.productId; 
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where: {id: prodId}});
    })
    .then(products =>{
      let product;
      if (products.length>0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity +1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
};

exports.postCartDeleteProduct = (req, res, next) => {  // This is the controller for the cart page
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
    return cart.getProducts({where: {id: prodId}})
  })
  .then(products => {
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err)) 
};

exports.postOrder = (req, res) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart =cart;
    return cart.getProducts();
  })
  .then(products => {
    return req.user.createOrder()
    .then(order => {
      return order.addProduct(products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity }
        return product;
      }));
    })
    .catch(err => console.log(err))
  })
  .then(result =>{
    return fetchedCart.setProducts(null);
  })
  .then(result =>{
    res.redirect('/orders')
  })
  .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => { // This is the controller for the orders page
  req.user.getOrders({include: ['products']})
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

