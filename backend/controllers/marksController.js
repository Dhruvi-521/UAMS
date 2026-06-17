const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Course = require("../models/Course");

const uploadMarks = async (req, res) => {
  try {
    const {
      programId,
      semester,
      examType,
      excelData
    } = req.body;

    // console.log("Total Excel Rows:", excelData.length);

    let processed = 0;
    let studentNotFound = 0;
    let subjectNotFound = 0;

    for (const row of excelData) {

      processed++;

    //   console.log("================================");
    //   console.log("Processing Row:", processed);
    //   console.log("Student ID:", row.studentId);

      const student = await Student.findOne({
        studentId: row.studentId
      });

      if (!student) {
        studentNotFound++;
        console.log("Student NOT Found");
        continue;
      }

    //   console.log("Student Found:", student._id);

      const subjects = [];

      for (const key in row) {

        if (
          key === "studentId" ||
          key === "Total" ||
          key === "Percentage" ||
          key === "Grade" ||
          key === "Status"
        ) {
          continue;
        }

        const cleanCourseName = key
          .replace(/\.\d+$/, "")
          .trim();

        const course = await Course.findOne({
          courseName: cleanCourseName
        });

        if (!course) {
          subjectNotFound++;
          console.log("Course Not Found:", cleanCourseName);
          continue;
        }

        subjects.push({
          courseId: course._id,
          courseName: course.courseName,
          marksObtained: Number(row[key])
        });
      }

    //   console.log("Subjects Found:", subjects.length);

      await Marks.create({
        studentId: student._id,
        programId,
        semester,
        examType,
        subjects,
        totalMarks: row.Total || 0,
        percentage: row.Percentage || 0,
        grade: row.Grade || "",
        status: row.Status || "Pass"
      });
    }

    res.status(201).json({
      success: true,
      totalRows: excelData.length,
      studentNotFound,
      subjectNotFound
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllMarks = async (req, res) => {
  try {

    const marks = await Marks.find()
      .populate("studentId")
      .populate("programId")
      .populate("subjects.courseId");

    res.status(200).json({
      success: true,
      count: marks.length,
      data: marks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentMarks = async (req, res) => {
  try {

    const marks = await Marks.find({
      studentId: req.params.studentId,
    })
      .populate("studentId")
      .populate("programId")
      .populate("subjects.courseId");

    res.status(200).json({
      success: true,
      data: marks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadMarks,
  getAllMarks,
  getStudentMarks,
};