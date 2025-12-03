// controllers/authController.js
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "SIMS_SECRET_KEY", {
    expiresIn: "7d",
  });
};

// @desc Register a new user
// @route POST /api/auth/signup
// @access Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create new user
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during registration.", error });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password." });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password." });

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login.", error });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    // If password is being updated
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
