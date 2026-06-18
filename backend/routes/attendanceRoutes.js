const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/course/:courseId/divisions",
  authMiddleware,
  attendanceController.getDivisions,
);

router.get(
  "/course/:courseId/students/:division",
  authMiddleware,
  attendanceController.getStudents,
);    

router.get(
  "/student/my-attendance",
  authMiddleware,
  attendanceController.getStudentAttendance
);

router.post("/mark", authMiddleware, attendanceController.markAttendance);

module.exports = router;
