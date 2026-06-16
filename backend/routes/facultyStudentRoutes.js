const express = require("express");
const router = express.Router();

const {
  getDepartmentStudents
} = require("../controllers/facultyStudentController");

const protect = require("../middleware/authMiddleware");

router.get(
  "/department-students",
  protect,
  getDepartmentStudents
);

module.exports = router;