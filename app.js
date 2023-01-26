const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootdir = require('./utils/path')


app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);    // This is a middleware function

app.use((req,res, next) =>{
    res.sendFile(path.join(rootdir, 'views', '404.html'))
    console.log(rootdir)
})

app.listen(3001);
