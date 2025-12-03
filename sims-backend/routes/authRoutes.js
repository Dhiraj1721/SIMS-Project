// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateProfile,
} = require("../controllers/authController");
const protect = require("../middleware/protect"); // ✅ add this line

// POST /api/auth/signup → Register a new user
router.post("/signup", registerUser);

// POST /api/auth/login → Login existing user
router.post("/login", loginUser);

// PUT /api/auth/profile → Update profile (protected)
router.put("/profile", protect, updateProfile);

module.exports = router;
