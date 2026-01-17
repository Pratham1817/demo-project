import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "pratham18";
const STATIC_OTP = "123456";



export const registerUserService = async (data) => {
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
  });
};

export const sendOtpService = async (mobile) => {
  const user = await User.findOne({ mobile });
  if (!user) throw new Error("Mobile not registered");

  console.log(`STATIC OTP for ${mobile}: ${STATIC_OTP}`);
};

export const verifyOtpService = async (mobile, otp) => {
  if (otp !== STATIC_OTP) throw new Error("Invalid OTP");

  const user = await User.findOne({ mobile });
  if (!user) throw new Error("User not found");

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return { token, user };
};
