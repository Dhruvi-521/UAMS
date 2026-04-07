// Add these at the TOP of studentController.js
const Student = require("../models/Student");
const Users = require("../models/Users");

// 1. ADD STUDENT (Existing logic)
exports.addStudent = async (req, res) => {
  try {
    const { 
        address, city, state, country, pincode, 
        ...otherDetails 
    } = req.body;

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

    res.status(201).json({ success: true, message: "Student and User created!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. GET ALL STUDENTS (ADD THIS MISSING FUNCTION)
exports.getStudents = async (req, res) => {
    try {
        // .populate("program") will show program details instead of just the ID
        const data = await Student.find().populate("program");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};