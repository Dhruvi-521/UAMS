const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

exports.getDashboardStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const faculty = await Faculty.countDocuments();
    const courses = await Course.countDocuments();

    res.json({
      success: true,
      students,
      faculty,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};