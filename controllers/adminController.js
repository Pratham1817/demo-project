import {
  registerAdminService,
  sendAdminOtpService,
  verifyAdminOtpService,
} from "../services/adminService.js";

export const registerAdmin = async (req, res) => {
  try {
    await registerAdminService(req.body);
    res.status(201).json({success: true, message: "Admin registration successful"});
  } catch (err) {
    res.status(409).json({
      success: false,
      message: err.message,
    });
  }
};

export const sendAdminOtp = async (req, res) => {
  try {
    await sendAdminOtpService(req.body.mobile);
    res.json({
      success: true,
      message: "OTP sent to admin",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyAdminOtp = async (req, res) => {
  try {
    const { token, user } = await verifyAdminOtpService(
      req.body.mobile,
      req.body.otp
    );

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
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
