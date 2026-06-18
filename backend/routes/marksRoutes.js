const express = require("express");

const router = express.Router();

const {
  uploadMarks,
  getAllMarks,
  getStudentMarks,
   getMyMarks,
   downloadReport,
   updateMarks,
   getMarksByFilter
} = require("../controllers/marksController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/upload", uploadMarks);

router.get("/", getAllMarks);

router.get("/student/:studentId", getStudentMarks);

router.get("/my-marks", authMiddleware, getMyMarks);

// Download Report 
router.get(
  "/download-report/:markId",
  authMiddleware,
  downloadReport
);

// Update Student marks 
router.put(
  "/:marksId",
  authMiddleware,
  updateMarks
);

router.get(
  "/filter",
  authMiddleware,
  getMarksByFilter
);

module.exports = router;