import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";

import { connectDB } from "../lib/db.js";
import { User } from "../models/User.js";

dotenv.config({ path: path.resolve("server/.env") });

// Edit these or create users directly in MongoDB Atlas.
const usersToUpsert = [
  {
    role: "teacher",
    teacherId: "T-1001",
    password: "teacher123",
    fullName: "Dr. Sarah Mitchell",
    roleTitle: "Dean of Academics",
    department: "Academic Affairs",
  },
  {
    role: "student",
    studentId: "S-2001",
    password: "student123",
    fullName: "Alex Johnson",
    department: "Computer Science",
  },
];

await connectDB();

for (const u of usersToUpsert) {
  const passwordHash = await bcrypt.hash(u.password, 10);
  if (u.role === "teacher") {
    await User.updateOne(
      { role: "teacher", teacherId: u.teacherId },
      {
        $set: {
          role: "teacher",
          teacherId: u.teacherId,
          passwordHash,
          fullName: u.fullName,
          roleTitle: u.roleTitle,
          department: u.department,
        },
      },
      { upsert: true }
    );
  } else {
    await User.updateOne(
      { role: "student", studentId: u.studentId },
      {
        $set: {
          role: "student",
          studentId: u.studentId,
          passwordHash,
          fullName: u.fullName,
          department: u.department,
        },
      },
      { upsert: true }
    );
  }
}

// eslint-disable-next-line no-console
console.log("Seed complete.");
process.exit(0);


