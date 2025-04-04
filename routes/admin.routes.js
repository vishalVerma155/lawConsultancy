const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getAdminProfile } = require("../controllers/admin.controllers.js");
const verifyJWT = require("../middleware/auth.middleware.js");

// 🔹 Register Admin
router.post("/register", registerAdmin);

// 🔹 Login Admin
router.post("/login", loginAdmin);

// 🔹 Get Admin Profile (Protected)
router.get("/profile", verifyJWT, getAdminProfile);

module.exports = router;
