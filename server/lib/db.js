import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI. Create server/.env (see server/.env.example).");
  }

  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    dbName: process.env.MONGODB_DBNAME || "university_hub",
  });
}


