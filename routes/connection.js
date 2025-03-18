const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/sensordata');

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  timestamp: { type: Date, default: Date.now }
});
const Sensor = mongoose.model('Sensor', sensorSchema);

// POST route for ESP32 to send data
app.post('/api/sensor-data', async (req, res) => {
  const { temperature, humidity } = req.body;
  console.log('Data from ESP32:', req.body);

  const newData = new Sensor({ temperature, humidity });
  await newData.save();

  res.status(200).send('Data saved');
});

// EJS route to display data
app.get('/', async (req, res) => {
  const data = await Sensor.find().sort({ timestamp: -1 }).limit(10);
  res.render('index', { sensorData: data });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});