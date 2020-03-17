const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UniformIssue = new Schema({
  Cadets:      {type: mongoose.Schema.ObjectId, required: true, ref:'Cadets'},
  UniformItem: {type: mongoose.Schema.ObjectId, required: true, ref:'UniformItem'},
  DateIssued:     {type: Date},
  DateReturned:     {type: Date},

});

const UniformIssued = mongoose.model('UniformIssued', UniformIssue, 'UniformIssued');

module.exports = UniformIssued;