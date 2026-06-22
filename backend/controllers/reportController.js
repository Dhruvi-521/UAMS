const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Program = require("../models/Program");
const Department = require("../models/Department");
const Attendance = require("../models/Attendance");
const Marks = require("../models/Marks");


// ======================================================
// DASHBOARD SUMMARY
// ======================================================

const getDashboardSummary = async (req, res) => {
  try {

    const totalStudents =
      await Student.countDocuments();

    const totalFaculty =
      await Faculty.countDocuments();

    const totalCourses =
      await Course.countDocuments();

    const attendanceRecords =
      await Attendance.find();

    const presentCount =
      attendanceRecords.filter(
        record => record.status === "Present"
      ).length;

    const attendancePercentage =
      attendanceRecords.length > 0
        ? (
            (presentCount /
              attendanceRecords.length) *
            100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        totalCourses,
        attendancePercentage
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================================
// ATTENDANCE ANALYTICS
// ======================================================

const getAttendanceAnalytics = async (
  req,
  res
) => {
  try {

    const attendance =
      await Attendance.find()
        .populate("student")
        .populate("course");

    const totalRecords =
      attendance.length;

    const present =
      attendance.filter(
        item => item.status === "Present"
      ).length;

    const absent =
      attendance.filter(
        item => item.status === "Absent"
      ).length;

    const attendancePercentage =
      totalRecords > 0
        ? (
            (present / totalRecords) *
            100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalRecords,
        present,
        absent,
        attendancePercentage
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================================
// EXAMINATION RESULT STATISTICS
// ======================================================

const getExamStatistics = async (
  req,
  res
) => {
  try {

    const marks =
      await Marks.find()
        .populate("studentId");

    const passCount =
      marks.filter(
        item => item.status === "Pass"
      ).length;

    const failCount =
      marks.filter(
        item => item.status === "Fail"
      ).length;

    const topper =
      marks.length > 0
        ? [...marks].sort(
            (a, b) =>
              b.percentage - a.percentage
          )[0]
        : null;

    const averagePercentage =
      marks.length > 0
        ? (
            marks.reduce(
              (sum, item) =>
                sum + item.percentage,
              0
            ) / marks.length
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalResults: marks.length,
        passCount,
        failCount,
        averagePercentage,
        topper
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ======================================================
// PROGRAM ACADEMIC REPORT
// ======================================================

const getProgramAcademicReport =
  async (req, res) => {
    try {

      const programs =
        await Program.find();

      const report = [];

      for (const program of programs) {

        const students =
          await Student.countDocuments({
            program: program._id
          });

        const marks =
          await Marks.find({
            programId: program._id
          });

        const averagePercentage =
          marks.length > 0
            ? (
                marks.reduce(
                  (sum, item) =>
                    sum +
                    item.percentage,
                  0
                ) / marks.length
              ).toFixed(2)
            : 0;

        const passCount =
          marks.filter(
            item =>
              item.status === "Pass"
          ).length;

        const passPercentage =
          marks.length > 0
            ? (
                (passCount /
                  marks.length) *
                100
              ).toFixed(2)
            : 0;

        report.push({
          programId: program._id,
          programName:
            program.programName,
          totalStudents: students,
          averagePercentage,
          passPercentage
        });
      }

      res.status(200).json({
        success: true,
        data: report
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };


// ======================================================
// STUDENT PERFORMANCE REPORT
// ======================================================

const getStudentPerformanceReport =
  async (req, res) => {
    try {

      const students =
        await Student.find();

      const report = [];

      for (const student of students) {

        const studentMarks =
          await Marks.find({
            studentId: student._id
          });

        if (
          studentMarks.length === 0
        ) {
          continue;
        }

        const averagePercentage =
          (
            studentMarks.reduce(
              (sum, item) =>
                sum +
                item.percentage,
              0
            ) /
            studentMarks.length
          ).toFixed(2);

        report.push({
          studentId:
            student.studentId,
          name:
            `${student.firstName} ${student.lastName}`,
          semester:
            student.semester,
          averagePercentage
        });
      }

      report.sort(
        (a, b) =>
          b.averagePercentage -
          a.averagePercentage
      );

      res.status(200).json({
        success: true,
        count: report.length,
        data: report
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };


// ======================================================
// DEPARTMENT PERFORMANCE REPORT
// ======================================================

const getDepartmentPerformanceReport =
  async (req, res) => {
    try {

      const departments =
        await Department.find();

      const report = [];

      for (const department of departments) {

        const programs =
          await Program.find({
            departmentName:
              department._id
          });

        let totalStudents = 0;
        let totalMarks = 0;
        let marksCount = 0;

        for (const program of programs) {

          totalStudents +=
            await Student.countDocuments({
              program:
                program._id
            });

          const marks =
            await Marks.find({
              programId:
                program._id
            });

          marks.forEach(mark => {
            totalMarks +=
              mark.percentage;
            marksCount++;
          });
        }

        const averagePercentage =
          marksCount > 0
            ? (
                totalMarks /
                marksCount
              ).toFixed(2)
            : 0;

        report.push({
          departmentId:
            department._id,
          departmentName:
            department.DepartmentName,
          totalPrograms:
            programs.length,
          totalStudents,
          averagePercentage
        });
      }

      res.status(200).json({
        success: true,
        data: report
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }
  };



module.exports = {
  getDashboardSummary,
  getAttendanceAnalytics,
  getExamStatistics,
  getProgramAcademicReport,
  getStudentPerformanceReport,
  getDepartmentPerformanceReport
};