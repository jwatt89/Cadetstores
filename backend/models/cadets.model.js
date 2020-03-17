const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cadet = new Schema({
  Name:      {type: String, required: true,},
  Gender: {type: String, required: true},
});

const Cadets = mongoose.model('Cadets', Cadet, 'Cadets');

module.exports = Cadets;