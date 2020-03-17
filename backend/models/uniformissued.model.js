const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UniformDemand = new Schema({
  CadetID:            {type: mongoose.Schema.ObjectId, required: true, ref:'CadetID'},
  CurrentUniformItem: {type: mongoose.Schema.ObjectId, ref:'CurrentUniformItem'},
  Reason:             {type: mongoose.Schema.ObjectId, ref:'CurrentUniformItem'},
  DateDemanded:       {type: Date},
  SatisfingIssue: {type: mongoose.Schema.ObjectId, ref:'SatisfingIssue'},
 

});

const UniformDemands = mongoose.model('UniformDemand', UniformDemand, 'UniformDemand');

module.exports = UniformDemands;