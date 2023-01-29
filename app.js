const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs'); // here, we wanna compile dynamic tamplate with "pug" engine 
app.set('views', 'views'); // where pug(engine) find this tamplates

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))) // this is for css

app.use('/admin', adminRoutes);
app.use(shopRoutes);    // This is a middleware function

app.use(errorController.get404)

app.listen(3000);
