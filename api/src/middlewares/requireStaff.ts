import { NextFunction, Request, Response } from "express";
import { auth } from "../auth.js";
import { myPrisma } from "../prisma.js";

export const requireStaff = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: req.headers as Record<string, string>,
  });

  if (!session?.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const staffProfiles = await myPrisma.staffProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: { id: true, displayName: true, role: true, avatarUrl: true },
  });

  if (!staffProfiles) {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
};
