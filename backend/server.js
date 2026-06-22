require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

/* ======================
   ROUTE IMPORTS
====================== */

const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const facultyCourseRoutes =
  require("./routes/facultyCourseRoutes");

const facultyStudentRoutes =
  require("./routes/facultyStudentRoutes");

const marksRoutes =
  require("./routes/marksRoutes");

const attendanceRoutes =
  require("./routes/attendanceRoutes");

const materialRoutes =
  require("./routes/materialRoutes");

const mentoringRoutes =
  require("./routes/mentoringRoutes");

const reportRoutes =
  require("./routes/reportRoutes");

/* ======================
   ROUTE REGISTRATION
====================== */

app.use("/api", adminRoutes);

app.use(
  "/api",
  require("./routes/departmentRoutes")
);

app.use(
  "/api",
  require("./routes/programRoutes")
);

app.use(
  "/api",
  require("./routes/courseRoutes")
);

app.use(
  "/api",
  facultyRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api",
  require("./routes/dashboardRoutes")
);

app.use(
  "/api/students",
  studentRoutes
);

app.use(
  "/api",
  facultyCourseRoutes
);

app.use(
  "/api/faculty",
  facultyStudentRoutes
);

app.use(
  "/api/marks",
  marksRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/materials",
  materialRoutes
);

app.use(
  "/api/mentoring",
  mentoringRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

/* ======================
   STATIC FILES
====================== */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ======================
   SERVER
====================== */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});