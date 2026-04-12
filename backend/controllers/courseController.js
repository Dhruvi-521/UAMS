const Course = require("../models/Course");

// CREATE COURSE
exports.addCourse = async (req, res) => {
  try {
    if (!req.body.StartDate) {
      delete req.body.StartDate;
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      message: "Course added successfully",
      data: course,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET COURSES BY PROGRAM + SEMESTER
exports.getCourses = async (req, res) => {
  try {
    const { programId, semesterNumber } = req.params;

    const courses = await Course.find({
      programId,
      semesterNumber,
    });

    res.json(courses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Course updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE COURSE

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.json({
            message: "Course deleted successfully",
            data: deletedCourse
        });

    } catch (error) {
        console.error("DELETE COURSE ERROR:", error); // 🔥 important for debugging
        res.status(500).json({
            message: "Server error while deleting course",
            error: error.message
        });
    }
};