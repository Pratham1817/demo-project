import User from "../models/userModel.js";

export default function adminMiddleware(req, res, next) {
  try {
    // authMiddleware must run before this
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access denied, admin only" });
    }

    next();
  } catch (err) {
    console.error("Admin middleware error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
