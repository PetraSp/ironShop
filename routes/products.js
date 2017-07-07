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
      console.log(err)
      next(err);
    } else {
      res.redirect('/products')
    }
  })
})

router.get('/search', (req, res, next) => {
  Product.findByName('Yog', (err, products) => {
    console.log('products', products)
    res.send(`<pre><code>${products}</code></pre>`)
  })


});

router.get('/:id', (req, res, next) => {
  const productID = req.params.id;
  Product.findById(productID, (err, product) => {
    if (err) { return next(err) }
    res.render('products/show', { product });
  })
})

router.get('/:id/edit', (req, res, next) => {
  const productID = req.params.id;

  Product.findById(productID, (err, product) => {
    if (err) { return next(err) }
    res.render('products/edit', { product })
  })
})

router.post('/:id', (req, res, next) => {
  const productID = req.params.id;
  const productUpdate = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  }

  Product.findByIdAndUpdate(productID, productUpdate, (err, product) => {
    if (err) { return next(err) }    
    res.redirect('/products')
  })
})

router.post('/:id/delete', (req, res, next) => {
  const productID = req.params.id;
  Product.findByIdAndRemove(productID, (err, product) => {
    if (err) { return next(err)}
    console.log('product', product);
    res.redirect('/products');
  })
}) 



module.exports = router;
