import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pratham18";
const STATIC_OTP = "123456"; // Static OTP

// Create JWT
const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "24h" });

//  REGISTRATION 
export async function registerUser(req, res) {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    if (await User.findOne({ email })) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    if (await User.findOne({ mobile })) {
      return res
        .status(409)
        .json({ success: false, message: "Mobile already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      mobile,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// SEND OTP 
export async function sendOtp(req, res) {
  const { mobile } = req.body;

  if (!mobile) {
    return res
      .status(400)
      .json({ success: false, message: "Mobile number required" });
  }

  const user = await User.findOne({ mobile });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Mobile not registered" });
  }

  // Console log 
  console.log(`STATIC OTP for ${mobile}: ${STATIC_OTP}`);

  res.json({
    success: true,
    message: "OTP sent (static, check console for demo)",
  });
}

// VERIFY OTP 
export async function verifyOtp(req, res) {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Mobile and OTP required" });
  }

  if (otp !== STATIC_OTP) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  const user = await User.findOne({ mobile });
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }

  const token = createToken(user._id);

  res.json({
    success: true,
    token,
    user: { id: user._id, name: user.name, mobile: user.mobile, role: user.role },
  });
}
