// const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  dishType: { type: String, required: true },
  preparationTime: { type: String, required: true },
  noOfSlices: { type: Number},
  diameter: { type: String},
  spicinesScale: { type: Number},
  slicesOfBread: { type: Number},
});

module.exports = mongoose.model('Food', foodsSchema);
