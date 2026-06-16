const FacultyCourseAssignment = require("../models/FacultyCourseAssignment");
const Course = require("../models/Course");

exports.assignCoursesToFaculty = async (req, res) => {
    try {

        const { facultyId, courseIds } = req.body;

        if (!facultyId || !courseIds?.length) {
            return res.status(400).json({
                message: "facultyId and courseIds are required"
            });
        }

        // Remove old assignments
        await FacultyCourseAssignment.deleteMany({
            facultyId
        });

        // Create new assignments
        const assignments = courseIds.map(courseId => ({
            facultyId,
            courseId
        }));

        await FacultyCourseAssignment.insertMany(assignments);

        res.status(200).json({
            success: true,
            message: "Courses assigned successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getFacultyCourses = async (req, res) => {
    try {

        const { facultyId } = req.params;

        const assignments =
            await FacultyCourseAssignment
                .find({ facultyId })
                .populate("courseId");

        const courses = assignments.map(
            item => item.courseId
        );

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find({
            isActive: true
        });

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getMyCourses = async (req, res) => {
    try {

        if (req.user.role !== "faculty") {
            return res.status(403).json({
                message: "Only faculty can access courses"
            });
        }

        const facultyId = req.user.profileId;

        const assignments =
            await FacultyCourseAssignment
                .find({ facultyId })
                .populate("courseId");

        const courses = assignments.map(
            item => item.courseId
        );

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};