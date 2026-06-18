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

// app.use("/api/faculty", facultyRoutes);
app.use('/api', require('./routes/facultyRoutes'));

const userRoutes = require("./routes/userRoutes")
app.use("/api/users", userRoutes);

//Admin Dashboard Route 
app.use("/api", require("./routes/dashboardRoutes"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ... other imports students 
const studentRoutes = require("./routes/studentRoutes");
// ... other middleware
app.use("/api/students", studentRoutes);

// Faculty + course
const facultyCourse = require("./routes/facultyCourseRoutes")
app.use("/api",facultyCourse)

app.use(
  "/api/faculty",
  require("./routes/facultyStudentRoutes")
);

// Marks
const marksRoutes = require("./routes/marksRoutes");
app.use("/api/marks", marksRoutes);

const attendanceRoutes =
require("./routes/attendanceRoutes");

app.use(
  "/api/attendance",
  attendanceRoutes
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});