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

exports.getCourseAttendance = async (req, res) => {
  try {
    const studentId = req.user.profileId;

    const records = await Attendance.find({
      student: studentId,
      course: req.params.courseId,
    })
      .populate("course", "courseName courseId")
      .sort({ attendanceDate: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};  

exports.getAttendanceAnalytics = async (req, res) => {
  try {

    const totalRecords =
      await Attendance.countDocuments();

    const presentRecords =
      await Attendance.countDocuments({
        status: "Present"
      });

    const overallAttendance =
      totalRecords === 0
        ? 0
        : (
            (presentRecords / totalRecords) *
            100
          ).toFixed(2);

    const monthlyData =
      await Attendance.aggregate([
        {
          $group: {
            _id: {
              month: {
                $month: "$attendanceDate"
              }
            },
            total: {
              $sum: 1
            },
            present: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present"
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },
        {
          $project: {
            month: "$_id.month",
            attendance: {
              $multiply: [
                {
                  $divide: [
                    "$present",
                    "$total"
                  ]
                },
                100
              ]
            }
          }
        },
        {
          $sort: {
            month: 1
          }
        }
      ]);

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const formattedData =
      monthlyData.map((item) => ({
        month: months[item.month],
        attendance:
          Number(item.attendance.toFixed(2))
      }));

    res.json({
      overallAttendance,
      presentRecords,
      absentRecords:
        totalRecords - presentRecords,
      monthlyData: formattedData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getTodayAttendance = async (req, res) => {
  try {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const totalStudents =
      await Student.countDocuments({
        status: "Active"
      });

    const presentStudents =
      await Attendance.countDocuments({
        attendanceDate: {
          $gte: start,
          $lte: end
        },
        status: "Present"
      });

    const absentStudents =
      await Attendance.countDocuments({
        attendanceDate: {
          $gte: start,
          $lte: end
        },
        status: "Absent"
      });

    const attendancePercentage =
      totalStudents === 0
        ? 0
        : (
            (presentStudents / totalStudents) *
            100
          ).toFixed(2);

    res.json({
      totalStudents,
      presentStudents,
      absentStudents,
      attendancePercentage
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProgramAttendanceAnalytics = async (req, res) => {
  try {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Overall attendance for today
    const totalRecords = await Attendance.countDocuments({
      attendanceDate: {
        $gte: start,
        $lte: end
      }
    });

    const presentRecords = await Attendance.countDocuments({
      attendanceDate: {
        $gte: start,
        $lte: end
      },
      status: "Present"
    });

    const overallAttendance =
      totalRecords === 0
        ? 0
        : Number(
            (
              (presentRecords / totalRecords) *
              100
            ).toFixed(2)
          );

    // Program wise attendance
    const programAttendance =
      await Attendance.aggregate([

        {
          $match: {
            attendanceDate: {
              $gte: start,
              $lte: end
            }
          }
        },

        {
          $lookup: {
            from: "students",
            localField: "student",
            foreignField: "_id",
            as: "studentInfo"
          }
        },

        {
          $unwind: "$studentInfo"
        },

        {
          $lookup: {
            from: "programs",
            localField:
              "studentInfo.program",
            foreignField: "_id",
            as: "programInfo"
          }
        },

        {
          $unwind: "$programInfo"
        },

        {
          $group: {
            _id:
              "$programInfo.programName",

            total: {
              $sum: 1
            },

            present: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "Present"
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        },

        {
          $project: {
            _id: 0,

            program: "$_id",

            attendance: {
              $round: [
                {
                  $multiply: [
                    {
                      $divide: [
                        "$present",
                        "$total"
                      ]
                    },
                    100
                  ]
                },
                2
              ]
            }
          }
        },

        {
          $sort: {
            attendance: -1
          }
        }
      ]);

    res.json({
      overallAttendance,
      programAttendance
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};