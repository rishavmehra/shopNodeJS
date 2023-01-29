const fs = require('fs')
const path = require('path')

const rootDir = require('../utils/path')

const p = path.join(rootDir, 'data', 'products.json');  // this the full path where wanna store the data

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else{
            cb(JSON.parse(fileContent));
        }
    });    
}

module.exports = class Product {
    constructor(t){
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) =>{  // put the content to the file
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
