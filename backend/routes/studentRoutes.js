const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// ADD
router.post("/add", studentController.addStudent);

// GET
router.get("/", studentController.getStudents);

// DELETE
router.delete("/student/:id", studentController.deleteStudent);

// ✅ EXCEL UPLOAD
router.post("/upload-excel", upload.single("file"), studentController.uploadExcel);

module.exports = router;