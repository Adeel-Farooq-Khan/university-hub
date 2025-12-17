import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["pdf", "doc", "image", "zip"], required: true },
    size: { type: String, required: true },
  },
  { _id: false }
);

const AnnouncementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ["announcement", "assignment", "event", "urgent"], required: true },
    department: { type: String, required: true },
    createdAt: { type: Date, required: true, default: () => new Date() },
    dueDate: { type: Date },
    attachments: { type: [AttachmentSchema], default: [] },
    image: { type: String },

    author: { type: String, required: true },
    authorRole: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

export const Announcement =
  mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);


