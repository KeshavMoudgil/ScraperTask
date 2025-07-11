const mongoose = require('mongoose');

const HotelPriceSchema = new mongoose.Schema({
    url : {type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    price: { type: Number, required: true },
    success: { type: Boolean, required: true },
    fetchedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('HotelPrice', HotelPriceSchema);