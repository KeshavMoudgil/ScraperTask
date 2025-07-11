const { chromium } = require('playwright');

async function fetchHotelPrice({ hotelUrl, checkIn, checkOut }) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const finalUrl = `${hotelUrl}?checkin=${checkIn}&checkout=${checkOut}`;
    await page.goto(finalUrl, { timeout: 15000 });

    // Wait for price element (mock selector below)
    await page.waitForSelector('.price');

    const price = await page.$eval('.price', el => el.textContent.trim());

    await browser.close();
    return { success: true, price };
  } catch (err) {
    await browser.close();
    return { success: false, error: err.message };
  }
}

module.exports = fetchHotelPrice;