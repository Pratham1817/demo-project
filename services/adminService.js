import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pratham18";
const STATIC_OTP = "123456";

export const registerAdminService = async (data) => {
  if (await User.findOne({ email: data.email })) {
    throw new Error("Email already exists");
  }

  if (await User.findOne({ mobile: data.mobile })) {
    throw new Error("Mobile already exists");
  }

  const hashed = await bcrypt.hash(data.password, 10);

  await User.create({
    ...data,
    password: hashed,
    role: "admin", //role admin
  });
};

export const sendAdminOtpService = async (mobile) => {
  const admin = await User.findOne({ mobile, role: "admin" });
  if (!admin) throw new Error("Admin not registered");

  console.log(`STATIC OTP for admin ${mobile}: ${STATIC_OTP}`);
};

export const verifyAdminOtpService = async (mobile, otp) => {
  if (otp !== STATIC_OTP) throw new Error("Invalid OTP");

  const admin = await User.findOne({ mobile, role: "admin" });
  if (!admin) throw new Error("Admin not found");

  const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return { token, user: admin };
};
