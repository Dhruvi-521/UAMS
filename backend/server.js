require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// ✅ Admin Route (YOU MISSED THIS)
const adminRoutes = require("./routes/adminRoutes");
app.use("/api", adminRoutes);

// 🔥 Use routes
app.use('/api', require('./routes/departmentRoutes'));
app.use('/api', require('./routes/programRoutes'));

app.use('/api', require('./routes/courseRoutes'));

app.use('/api', require('./routes/facultyRoutes'));

// app.use("/api/faculty", facultyRoutes);

// ... other imports students 
const studentRoutes = require("./routes/studentRoutes");
// ... other middleware
app.use("/api/students", studentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});