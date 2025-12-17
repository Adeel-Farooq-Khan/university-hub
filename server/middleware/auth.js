import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ error: "Invalid token" });

    req.user = {
      id: String(user._id),
      role: user.role,
      teacherId: user.teacherId,
      studentId: user.studentId,
      fullName: user.fullName,
      roleTitle: user.roleTitle,
      department: user.department,
    };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    return next();
  };
}


