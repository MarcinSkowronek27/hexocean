// const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
  // _id: { type: ObjectId },
  dishName: { type: String, required: true },
  dishType: { type: String, required: true },
  preparationTime: { type: String, required: true },
  // no_of_slices: { type: Number},
  // diameter: { type: String},
  // spicines_scale: { type: Number},
  // slices_of_bread: { type: Number},
});

module.exports = mongoose.model('Food', foodsSchema);
