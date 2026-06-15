const express = require("express");
const router = express.Router();

const {
    assignCoursesToFaculty,
    getFacultyCourses,
    getAllCourses
} = require("../controllers/facultyCourseController");

router.post(
    "/faculty-course/assign",
    assignCoursesToFaculty
);

router.get(
    "/faculty-course/:facultyId",
    getFacultyCourses
);

router.get(
    "/all-courses",
    getAllCourses
);

module.exports = router;
