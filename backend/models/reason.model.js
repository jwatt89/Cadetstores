const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DemandReason = new Schema({
  Reason:      {type: String, required: true, unique: true},
  Category: {type: String},
  SizeChange:     {type: Number},

});

const DemandReasons = mongoose.model('DemandReason', DemandReason, 'DemandReason');

module.exports = DemandReasons;