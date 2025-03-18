const mongoose = require('mongoose');

const CropInfoSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    soil: { type: String, required: true },
    threshold: { type: Number, required: true },
});

module.exports = mongoose.model('CropInfo', CropInfoSchema);
