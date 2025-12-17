import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./lib/db.js";
import { authRouter } from "./routes/auth.js";
import { announcementsRouter } from "./routes/announcements.js";

dotenv.config({ path: path.resolve("server/.env") });

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET. Create server/.env (see server/env.example).");
}

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: false,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRouter);
app.use("/api/announcements", announcementsRouter);

const port = Number(process.env.PORT || 5000);

await connectDB();
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${port}`);
});


