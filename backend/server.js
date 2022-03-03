const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const foodsRoutes = require('./routes/foods.routes');

const app = express();

let dbUri = '';

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', foodsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ foods: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
// mongoose.connect('mongodb://localhost:27017/foodsDB', { useNewUrlParser: true, useUnifiedTopology: true });
dbUri = 'mongodb://localhost:27017/foodsDB';
try {
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  if (process.env.debug === true) console.log(err);
  else console.log('Couldn\'t connect to db...');
}
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
