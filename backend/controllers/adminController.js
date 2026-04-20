const Admin = require("../models/Admin");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");

// ============================
// REGISTER ADMIN
// ============================
exports.registerAdmin = async (req, res) => {
  try {
    const {
      username,
      password,
      firstName,
      middleName,
      lastName,
      address,
      phone,
      email
    } = req.body;

    // 🔍 Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    // 🔍 Check existing user
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // ============================
    // 1. CREATE ADMIN
    // ============================
    const newAdmin = new Admin({
      firstName,
      middleName,
      lastName,
      address,
      phone,
      email
    });

    const savedAdmin = await newAdmin.save();

    // ============================
    // 2. HASH PASSWORD
    // ============================
    const hashedPassword = await bcrypt.hash(password, 10);

    // ============================
    // 3. CREATE USER (refPath)
    // ============================
    const newUser = new Users({
      userID: savedAdmin._id,
      onModel: "Admin",
      username,
      password: hashedPassword,
      role: "admin"
    });

    await newUser.save();

    // ============================
    // SUCCESS RESPONSE
    // ============================
    res.status(201).json({
      message: "Admin registered successfully",
      adminId: savedAdmin._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};