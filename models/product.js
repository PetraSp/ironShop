const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const productSchema = new Schema({
  name: { type: String, required: [true, 'Please enter your name 😋'] },
  price: Number,
  imageUrl: String,
  description: String,
  reviews: [Review.schema],
});

productSchema.statics.findByName = function (name, cb) {
  return this.find({ name: new RegExp(name, 'i') }, cb);
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;