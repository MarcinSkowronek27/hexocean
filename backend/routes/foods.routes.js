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

router.post('https://frosty-wood-6558.getsandbox.com:443/dishes', async (req, res) => {
  try {
    const { id, name,
      type,
      preparation_time,
      diameter,
      no_of_slices,
      spiciness_scale,
      slices_of_bread,
    } = req.body;
    const newFood = new Food({
      id,
      name,
      type,
      preparation_time,
      diameter,
      no_of_slices,
      spiciness_scale,
      slices_of_bread,
    });
    await newFood.save();
    if (!newFood) res.status(404).json({ foods: 'Not found' });
    else res.json(newFood);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
