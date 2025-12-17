import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { Announcement } from "../models/Announcement.js";

export const announcementsRouter = Router();

announcementsRouter.get("/", requireAuth, async (_req, res) => {
  const docs = await Announcement.find({})
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return res.json({
    announcements: docs.map((a) => ({
      id: String(a._id),
      title: a.title,
      content: a.content,
      category: a.category,
      author: a.author,
      authorRole: a.authorRole,
      department: a.department,
      createdAt: new Date(a.createdAt).toISOString(),
      dueDate: a.dueDate ? new Date(a.dueDate).toISOString() : undefined,
      attachments: a.attachments || [],
      image: a.image,
    })),
  });
});

announcementsRouter.post(
  "/",
  requireAuth,
  requireRole("teacher"),
  async (req, res) => {
    const {
      title,
      content,
      category,
      department,
      dueDate,
      attachments,
      image,
    } = req.body || {};

    if (typeof title !== "string" || title.trim().length < 1) {
      return res.status(400).json({ error: "Title required" });
    }
    if (typeof content !== "string" || content.trim().length < 1) {
      return res.status(400).json({ error: "Content required" });
    }
    if (!["announcement", "assignment", "event", "urgent"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    if (typeof department !== "string" || department.trim().length < 1) {
      return res.status(400).json({ error: "Department required" });
    }

    const created = await Announcement.create({
      title: title.trim(),
      content: content.trim(),
      category,
      department: department.trim(),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      attachments: Array.isArray(attachments) ? attachments : [],
      image: typeof image === "string" ? image : undefined,
      author: req.user.fullName,
      authorRole: req.user.roleTitle || "Teacher",
      createdBy: req.user.id,
      createdAt: new Date(),
    });

    return res.status(201).json({
      announcement: {
        id: String(created._id),
        title: created.title,
        content: created.content,
        category: created.category,
        author: created.author,
        authorRole: created.authorRole,
        department: created.department,
        createdAt: created.createdAt.toISOString(),
        dueDate: created.dueDate ? created.dueDate.toISOString() : undefined,
        attachments: created.attachments || [],
        image: created.image,
      },
    });
  }
);
