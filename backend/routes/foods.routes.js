const express = require('express');
const router = express.Router();

// const Food = require('../models/food.model');

// router.get('/foods', async (req, res) => {
//   try {
//     const result = await Food.find();
//     if (!result) res.status(404).json({ foods: 'Not found' });
//     else res.json(result);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/foods', async (req, res) => {
//   console.log(req.body);
//   try {
//     const { dish_name, dish_type } = req.body;
//     const newFood = new Food({ dish_name, dish_type });
//     await newFood.save();
//     if (!newFood) res.status(404).json({ food: 'Not found' });
//     else res.json(newFood);
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/foods', (req, res) => {
  req.db.collection('foods').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.post('/foods', (req, res) => {
  const { dish_name, dish_type } = req.body;
  req.db.collection('foods').insertOne({ dish_name, dish_type }, err => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

module.exports = router;
