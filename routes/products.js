var express = require('express');
var router = express.Router();
const Product = require('../models/product');

router.get('/', function (req, res, next) {
  Product.find({}, (err, products) => {
    if (err) {
      next(err);
    } else {
      res.render('products/index', { products } );
    }
  })
});

router.get('/new', (req, res, next) => {
  res.render('products/new');
})

router.post('/', (req, res, next )=> {
  const productInfo = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  }

  const newProduct = new Product( productInfo )
  newProduct.save( (err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/products')
    }
  })
})

module.exports = router;
