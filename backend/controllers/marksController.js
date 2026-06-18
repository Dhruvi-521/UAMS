const Marks = require("../models/Marks");
const Student = require("../models/Student");
const Course = require("../models/Course");
const PDFDocument = require("pdfkit");

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

const getMyMarks = async (req, res) => {
  try {

    const studentId = req.user.profileId;

    const marks = await Marks.find({
      studentId: studentId,
    })
      .populate("studentId")
      .populate("programId")
      .populate("subjects.courseId")
      .sort({ createdAt: -1 });

    if (!marks.length) {
      return res.status(404).json({
        success: false,
        message: "No marks found",
      });
    }

    res.status(200).json({
      success: true,
      student: marks[0].studentId,
      data: marks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Marks 
const updateMarks = async (req, res) => {
  try {
    // console.log("Marks ID:", req.params.marksId);
    // console.log("Body:", req.body);
    const updatedMarks =
      await Marks.findByIdAndUpdate(
        req.params.marksId,
        {
          subjects: req.body.subjects,
          totalMarks: req.body.totalMarks,
          percentage: req.body.percentage,
          grade: req.body.grade,
          status: req.body.status
        },
        {
          new: true
        }
      );

    if (!updatedMarks) {
      return res.status(404).json({
        success: false,
        message: "Marks record not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedMarks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Download PDF 
const downloadReport = async (req, res) => {
  try {

    const marks = await Marks.findById(
      req.params.markId
    )
      .populate("studentId")
      .populate("subjects.courseId");

    if (!marks) {
      return res.status(404).json({
        message: "Marks not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=result.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text(
      "Student Result Report",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.fontSize(12).text(
      `Student Name: ${marks.studentId.firstName} ${marks.studentId.lastName}`
    );

    doc.text(
      `Student ID: ${marks.studentId.studentId}`
    );

    doc.text(
      `Semester: ${marks.semester}`
    );

    doc.text(
      `Exam Type: ${marks.examType}`
    );

    doc.moveDown();

    marks.subjects.forEach(subject => {
      doc.text(
        `${subject.courseName} : ${subject.marksObtained}`
      );
    });

    doc.moveDown();

    doc.text(
      `Percentage : ${marks.percentage}%`
    );

    doc.text(
      `Grade : ${marks.grade}`
    );

    doc.text(
      `Status : ${marks.status}`
    );

    doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMarksByFilter = async (req, res) => {
  try {

    const {
      programId,
      semester,
      examType
    } = req.query;

    const marks = await Marks.find({
      programId,
      semester,
      examType
    })
      .populate("studentId");

    res.status(200).json({
      success: true,
      data: marks
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  uploadMarks,
  getAllMarks,
  getStudentMarks,
  getMyMarks,
  downloadReport,
  updateMarks,
  getMarksByFilter
};