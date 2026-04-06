require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// 🔥 Use routes
app.use('/api', require('./routes/departmentRoutes'));
app.use('/api', require('./routes/programRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});