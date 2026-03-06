const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "patient" // default role
    });

    await newUser.save();

    res.status(201).json({
      msg: "User registered successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Register error" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey", // ⚠️ use same in middleware
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Login error" });
  }
};