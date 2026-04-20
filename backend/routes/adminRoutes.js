const express = require("express");
const router = express.Router();
const { registerAdmin } = require("../controllers/adminController");

// POST: Register Admin
router.post("/admin/register", registerAdmin);

module.exports = router;