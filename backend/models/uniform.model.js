const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UniformItem = new Schema({
  NSN:      {type: String, required: true, unique: true},
  Category: {type: String, required: true},
	StockQty: {type: Number, required: true},
  Size1:     {type: String},
  Size2:     {type: String},
  Size3:     {type: String},

});

const Uniform = mongoose.model('UniformItem', UniformItem, 'UniformItems');

module.exports = Uniform;