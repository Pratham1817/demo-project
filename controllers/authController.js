import {
  registerUserService,
  sendOtpService,
  verifyOtpService,} from "../services/authService.js";



export const registerUser = async (req, res) => {
  try {
    await registerUserService(req.body);
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (err) {
    res.status(409).json({ success: false, message: err.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    await sendOtpService(req.body.mobile);
    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { token, user } = await verifyOtpService(req.body.mobile, req.body.otp );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    });
  }
   catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
