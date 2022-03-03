// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');

// const foodsRoutes = require('./routes/foods.routes');

// const app = express();

// /* MIDDLEWARE */
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// /* API ENDPOINTS */
// app.use('/api', foodsRoutes);

// /* API ERROR PAGES */
// app.use('/api', (req, res) => {
//   res.status(404).send({ foods: 'Not found...' });
// });

// /* REACT WEBSITE */
// app.use(express.static(path.join(__dirname, '../build')));
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

// /* MONGOOSE */
// mongoose.connect('mongodb://localhost:27017/foods', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Successfully connected to the database');
// });
// db.on('error', err => console.log('Error: ' + err));

// /* START SERVER */
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log('Server is running on port: '+port);
// });

const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const foodsRoutes = require('./routes/foods.routes');

mongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');
    const db = client.db('foodsDB');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', foodsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    });

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });
  }
});
