const express = require('express');
const router = express.Router();

// Route to receive data from ESP32
router.post('/esp/data', (req, res) => {
    const { moisture, temperature } = req.body;
    console.log(`Received data - Moisture: ${moisture}, Temperature: ${temperature}`);

    // You can store this data in MongoDB
    res.json({ success: true, message: 'Data received' });
});

// Route to send data to ESP32
router.get('/esp/config', (req, res) => {
    res.json({ threshold: 500 }); // Example: Send threshold moisture value
});

module.exports = router;
