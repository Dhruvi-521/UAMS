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
<<<<<<< HEAD
app.use('/api', require('./routes/courseRoutes'));
=======
// app.use('/api', require('./routes/facultyRoutes'));
>>>>>>> 22f45f3d743a4bbe030e607fc1b685ab1899a86a

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});