const express = require("express");
const router = express.Router();
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// CREATE
router.post("/courses", addCourse);

// GET
router.get("/courses/:programId/:semesterNumber", getCourses);

// UPDATE
router.put("/courses/:id", updateCourse);

// DELETE route
router.delete('/delete-course/:id', deleteCourse);

module.exports = router;