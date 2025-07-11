require('dotenv').config();
const connectDB = require('./Db/Connect');
const hotelRoutes = require('./Routes/Hotels');

const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/hotels', hotelRoutes);

// Connect to MongoDB
connectDB();




const PORT = process.env.PORT ||3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});