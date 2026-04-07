const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

// ADD FACULTY
router.post("/faculty/add", facultyController.addFaculty);

// GET Faculty Data
router.get('/faculty', facultyController.getFaculty); // <--- use facultyController.getFaculty

module.exports = router;