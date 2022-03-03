const express = require('express');
const router = express.Router();

const Food = require('../models/food.model');

router.get('/foods', async (req, res) => {
  try {
    const result = await Food.find();
    if (!result) res.status(404).json({ foods: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/foods', async (req, res) => {
  console.log(req.body);
  try {
    const { dish_name, dish_type } = req.body;
    const newFood = new Food({ dish_name, dish_type });
    await newFood.save();
    if (!newFood) res.status(404).json({ foods: 'Not found' });
    else res.json(newFood);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;