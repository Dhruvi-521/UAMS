const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getDashboardSummary,
  getAttendanceAnalytics,
  getExamStatistics,
  getProgramAcademicReport,
  getStudentPerformanceReport,
  getDepartmentPerformanceReport,
} = require("../controllers/reportController");

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardSummary
);

router.get(
  "/attendance",
  authMiddleware,
  getAttendanceAnalytics
);

router.get(
  "/exam-statistics",
  authMiddleware,
  getExamStatistics
);

router.get(
  "/program-academic",
  authMiddleware,
  getProgramAcademicReport
);

router.get(
  "/student-performance",
  authMiddleware,
  getStudentPerformanceReport
);

router.get(
  "/department-performance",
  authMiddleware,
  getDepartmentPerformanceReport
);

module.exports = router;