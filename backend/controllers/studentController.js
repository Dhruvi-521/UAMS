const Student = require("../models/Student");
const Users = require("../models/Users");
const xlsx = require("xlsx");
const fs = require("fs");

// ============================
// ADD STUDENT (NORMAL)
// ============================
exports.addStudent = async (req, res) => {
  try {
    const { address, city, state, country, pincode, ...otherDetails } = req.body;

    const studentData = {
      ...otherDetails,
      address: {
        fullAddress: address,
        city,
        state,
        country,
        pincode
      }
    };

    const newStudent = new Student(studentData);
    const savedStudent = await newStudent.save();

    const newUser = new Users({
      userID: savedStudent._id,
      onModel: "Student",
      role: "student",
      password: req.body.password || "SU1234"
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "Student created" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============================
// GET ALL STUDENTS
// ============================
exports.getStudents = async (req, res) => {
  try {
    const data = await Student.find().populate("program");
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ============================
// DELETE STUDENT
// ============================
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Student.findOneAndDelete({ studentId: id });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    await Users.findOneAndDelete({ userID: deleted._id });

    res.json({
      success: true,
      message: "Student deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ============================
// EXCEL UPLOAD (MAIN FEATURE)
// ============================
exports.uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    const { program, semester, batch } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!program || !semester || !batch) {
      return res.status(400).json({
        success: false,
        message: "Program, Semester, Batch required"
      });
    }

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    let students = [];

    rows.forEach((row, index) => {
      // const studentId = `SU${new Date().getFullYear()}${String(index + 1).padStart(4, "0")}`; // This is regex to genrate studentID

      students.push({
        program,
        semester: Number(semester),
        batch,

        // ADD THIS (MAIN FIX)
        division: row.division || "",

        studentId:row.studentID,
        rollNumber: index + 1,

        firstName: row.firstName || "",
        middleName: row.middleName || "",
        lastName: row.lastName || "",

        gender: row.gender || "",
        dob: row.dob ? new Date(row.dob) : null,

        universityEmail: row.universityEmail,
        personalEmail: row.personalEmail || "",

        mobile: row.mobile,
        parentContact: row.parentContact || "",

        address: {
          fullAddress: row.fullAddress || row.address || "",
          city: row.city || "",
          state: row.state || "",
          country: row.country || "",
          pincode: row.pincode || ""
        }
      });
    });

    const saved = await Student.insertMany(students);

    const users = saved.map((s) => ({
      userID: s._id,
      onModel: "Student",
      role: "student",
      password: "SU1234"
    }));

    await Users.insertMany(users);

    fs.unlinkSync(file.path);

    res.json({
      success: true,
      message: "Students uploaded successfully",
      count: saved.length
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};