const Student = require("../models/Student");
const Course = require("../models/Course");
const Attendance = require("../models/Attendance");

exports.getDivisions = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    const divisions = await Student.distinct("division", {
      program: course.programId,
      semester: course.semesterNumber,
      status: "Active",
    });

    res.json(divisions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    const students = await Student.find({
      program: course.programId,
      semester: course.semesterNumber,
      division: req.params.division,
      status: "Active",
    }).sort({ rollNumber: 1 });

    res.json(students);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const {
      courseId,
      division,
      attendanceDate,
      attendanceRecords,
    } = req.body;

    const facultyId = req.user.profileId;

    const records = attendanceRecords.map((student) => ({
      course: courseId,
      student: student.studentId,
      faculty: facultyId,
      division,
      attendanceDate,
      status: student.status,
    }));

    await Attendance.insertMany(records);

    res.json({
      success: true,
      message: "Attendance Saved",
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.user.profileId;

    const attendance = await Attendance.find({
      student: studentId,
    })
      .populate("course", "courseName courseId")
      .sort({ attendanceDate: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};