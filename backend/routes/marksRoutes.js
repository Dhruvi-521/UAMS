const express = require("express");

const router = express.Router();

const {
  uploadMarks,
  getAllMarks,
  getStudentMarks,
} = require("../controllers/marksController");

router.post("/upload", uploadMarks);

router.get("/", getAllMarks);

router.get("/student/:studentId", getStudentMarks);

module.exports = router;