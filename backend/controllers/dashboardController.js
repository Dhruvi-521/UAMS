const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Marks = require("../models/Marks");
const Program = require("../models/Program");

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

// exports.getReportsAnalytics = async (req, res) => {
//   try {

//     const totalStudents =
//       await Student.countDocuments();

//     const activeStudents =
//       await Student.countDocuments({
//         status: "Active"
//       });

//     const inactiveStudents =
//       await Student.countDocuments({
//         status: "Inactive"
//       });

//     const totalFaculty =
//       await Faculty.countDocuments();

//     const totalCourses =
//       await Course.countDocuments();

//     const totalMarksRecords =
//       await Marks.countDocuments();

//     const passCount =
//       await Marks.countDocuments({
//         status: "Pass"
//       });

//     const failCount =
//       await Marks.countDocuments({
//         status: "Fail"
//       });

//     const avgResult =
//       await Marks.aggregate([
//         {
//           $group: {
//             _id: null,
//             avgPercentage: {
//               $avg: "$percentage"
//             }
//           }
//         }
//       ]);

//     const averagePercentage =
//       avgResult.length
//         ? avgResult[0].avgPercentage.toFixed(2)
//         : 0;

//     const passRate =
//       totalMarksRecords
//         ? (
//             (passCount /
//               totalMarksRecords) *
//             100
//           ).toFixed(2)
//         : 0;

//     res.json({
//       totalStudents,
//       activeStudents,
//       inactiveStudents,

//       totalFaculty,
//       totalCourses,

//       totalMarksRecords,
//       passCount,
//       failCount,
//       passRate,

//       averagePercentage
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// };