// const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  id: { type: Number},
  name: { type: String, required: true },
  type: { type: String, required: true },
  preparation_time: { type: String, required: true },
  no_of_slices: { type: Number},
  diameter: { type: String},
  spiciness_scale: { type: Number},
  slices_of_bread: { type: Number},
});

module.exports = mongoose.model('Food', foodsSchema);
