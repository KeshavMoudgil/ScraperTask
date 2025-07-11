const express = require('express');
const router = express.Router();
const fetchHotelPrice = require('../Scraper/FetchPrices');
const HotelPrice = require('../Models/HotelPrice');

router.post('/fetch', async (req, res) => {
  const { hotelUrls, checkIn, checkOut } = req.body;

  try {
    const results = await Promise.all(
      hotelUrls.map(url =>
        fetchHotelPrice({ hotelUrl: url, checkIn, checkOut })
      )
    );

    const saved = await HotelPrice.insertMany(
      results.map((r, i) => ({
        url: hotelUrls[i],
        checkIn,
        checkOut,
        price: r.price || null,
        success: r.success,
        error: r.error || null,
        fetchedAt: new Date()
      }))
    );

    res.status(200).json({ message: 'Prices fetched', data: saved });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching prices', error: err });
  }
});

module.exports = router;