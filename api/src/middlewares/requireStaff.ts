import { NextFunction, Request, Response } from "express";
import { auth } from "../auth.js";
import { myPrisma } from "../prisma.js";
import { StaffRequest } from "../routes/staff.js";
import { StaffRole } from "@prisma/client";

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

  const staffProfile = await myPrisma.staffProfile.findFirst({
    where: { userId: session.user.id, deletedAt: null },
    select: { id: true, displayName: true, role: true, avatarUrl: true },
  });

  if (!staffProfile) {
    return res.status(403).json({ error: "Forbidden" });
  }

  (req as StaffRequest).staff = staffProfile;

  next();
};

export const requireStaffRole = (allowedRoles: StaffRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await requireStaff(req, res, () => {
      const staffReq = req as StaffRequest;

      if (!allowedRoles.includes(staffReq.staff.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      return next();
    });
  };
};
