const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  // getReportsAnalytics
} = require("../controllers/dashboardController");

router.get("/dashboard/stats", getDashboardStats);
// router.get(
//   "/dashboard/reports-analytics",
//   getReportsAnalytics
// );

module.exports = router;