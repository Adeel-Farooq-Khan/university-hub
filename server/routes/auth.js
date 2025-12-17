import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { role, teacherId, studentId, password } = req.body || {};
  if (role !== "teacher" && role !== "student") {
    return res.status(400).json({ error: "Invalid role" });
  }
  if (typeof password !== "string" || password.length < 1) {
    return res.status(400).json({ error: "Password required" });
  }

  const id = role === "teacher" ? teacherId : studentId;
  if (typeof id !== "string" || id.length < 1) {
    return res.status(400).json({ error: `${role} id required` });
  }

  const query = role === "teacher" ? { role, teacherId: id } : { role, studentId: id };
  const user = await User.findOne(query);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { sub: String(user._id), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: {
      id: String(user._id),
      role: user.role,
      loginId: role === "teacher" ? user.teacherId : user.studentId,
      fullName: user.fullName,
      roleTitle: user.roleTitle,
      department: user.department,
    },
  });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  return res.json({ user: req.user });
});


