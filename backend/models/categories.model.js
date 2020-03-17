const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema({
  Category:      {type: String, required: true, unique: true},
  Size1: {type: String},
  Size2: {type: String},
  Size3: {type: String}
});

const Categories = mongoose.model('Categories', Category, 'Categories');

module.exports = Categories;