require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Enable CORS to allow requests from the frontend origin
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
