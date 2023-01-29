const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars')

const app = express();

app.set('view engine', 'ejs'); // here, we wanna compile dynamic tamplate with "pug" engine 
app.set('views', 'views'); // where pug(engine) find this tamplates

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootdir = require('./utils/path');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public'))) // this is for css
app.use('/admin', adminData.routes);
app.use(shopRoutes);    // This is a middleware function

app.use((req,res, next) =>{
    res.status(404).render('404', {pageTitle: "NOT FOUND "})
})

app.listen(3001);

