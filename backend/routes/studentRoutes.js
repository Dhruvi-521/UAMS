const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// @route   POST api/students/add
// @desc    Add a new student and create their login account
router.post("/add", studentController.addStudent);

// @route   GET api/students
// @desc    Get all students for the management list
router.get("/", studentController.getStudents);

module.exports = router;