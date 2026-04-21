const Student = require("../models/Student");
const Users = require("../models/Users");
const xlsx = require("xlsx");
const fs = require("fs");
const bcrypt = require("bcrypt");
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

    // HASH PASSWORD
    const rawPassword = req.body.password || "SU1234";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const newUser = new Users({
      userID: savedStudent._id,
      onModel: "Student",
      role: "student",
      username: savedStudent.universityEmail,
      password: hashedPassword // encrypted Password store
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

      // ============================
      // ✅ DOB FIX (ALL CASES COVERED)
      // ============================
      let dobRaw =
        row.dob ||
        row.DOB ||
        row.Dob ||
        row["Date of Birth"] ||
        row["date of birth"];

      let dobValue = null;

      if (dobRaw) {
        if (typeof dobRaw === "number") {
          // Excel numeric date
          dobValue = new Date((dobRaw - 25569) * 86400 * 1000);
        } else {
          const parsed = new Date(dobRaw);
          dobValue = isNaN(parsed) ? null : parsed;
        }
      }

      // ✅ Email Validation
      const email =
        row.universityEmail ||
        row["University Email"];

      if (!email) {
        throw new Error(`Missing university email at row ${index + 1}`);
      }

      // ============================
      // ✅ PERSONAL EMAIL FIX
      // ============================
      const personalEmailValue =
        row.personalEmail ||
        row.PersonalEmail ||
        row["Personal Email"] ||
        row["personal email"] ||
        row.email ||
        "";

      // ============================
      // ✅ ADDRESS FIX
      // ============================
      const addressValue =
        row.fullAddress ||
        row.address ||
        row["Full Address"] ||
        "";

      // ============================
      // ✅ STUDENT ID FIX (fallback)
      // ============================
      const studentIdValue =
        row.studentID ||
        row.studentId ||
        `SU${new Date().getFullYear()}${String(index + 1).padStart(4, "0")}`;

      students.push({
        program,
        semester: Number(semester),
        batch,

        division: row.division || "",

        studentId: studentIdValue,
        rollNumber: index + 1,

        firstName: row.firstName || "",
        middleName: row.middleName || "",
        lastName: row.lastName || "",

        gender: row.gender || "",
        dob: dobValue,

        universityEmail:
          row.universityEmail ||
          row["University Email"] ||
          "",

        personalEmail: personalEmailValue,

        mobile: row.mobile || "",
        parentContact: row.parentContact || "",

        address: {
          fullAddress: addressValue,
          city: row.city || "",
          state: row.state || "",
          country: row.country || "",
          pincode: row.pincode || ""
        }
      });
    });

    // ✅ CHECK DUPLICATE EMAILS IN DB
    const emails = students.map(s => s.universityEmail);

    const existing = await Student.find({
      universityEmail: { $in: emails }
    });

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some university emails already exist in database"
      });
    }

    // ============================
    // ✅ SAVE STUDENTS
    // ============================
    const saved = await Student.insertMany(students);

    // ============================
    // ✅ CREATE USERS
    // ============================
    const users = [];

    for (const s of saved) {
      const hashedPassword = await bcrypt.hash("SU1234", 10);

      users.push({
        userID: s._id,
        onModel: "Student",
        role: "student",
        username: s.universityEmail,
        password: hashedPassword // ✅ encrypted
      });
    }

    await Users.insertMany(users);

    // ============================
    // ✅ DELETE FILE
    // ============================
    fs.unlinkSync(file.path);

    res.json({
      success: true,
      message: "Students uploaded successfully",
      count: saved.length
    });

  } catch (error) {
    console.error("❌ UPLOAD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message
    });
  }
};

// ============================
// UPDATE STUDENT
// ============================
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updatedData = {
      semester: body.semester,
      batch: body.batch,
      division: body.division,

      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
      dob: body.dob,
      gender: body.gender,

      universityEmail: body.universityEmail,
      personalEmail: body.personalEmail, //  FIXED
      mobile: body.mobile,
      parentContact: body.parentContact, // FIXED

      address: {
        fullAddress: body.fullAddress,
        city: body.city,
        state: body.state,
        country: body.country,
        pincode: body.pincode
      }
    };

    const updatedStudent = await Student.findOneAndUpdate(
      { studentId: id },
      updatedData,
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // UPDATE User table when you updated university email id of Student table
    await Users.findOneAndUpdate(
      { userID: updatedStudent._id },
      { username: updatedStudent.universityEmail }
    );

    res.json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent
    });

  } catch (error) {
    console.error("❌ UPDATE ERROR:", error);
    console.error("❌ BODY:", req.body);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};