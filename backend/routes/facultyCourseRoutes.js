const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    assignCoursesToFaculty,
    getFacultyCourses,
    getAllCourses,
    getMyCourses
} = require("../controllers/facultyCourseController");

router.post(
    "/faculty-course/assign",
    assignCoursesToFaculty
);

router.get(
    "/faculty-course/my-courses",
    authMiddleware,
    getMyCourses
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
