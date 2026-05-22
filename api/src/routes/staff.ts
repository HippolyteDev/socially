import express, { type Request } from "express";
import { requireStaff } from "../middlewares/requireStaff.js";

export type StaffRequest = Request & {
  staff: {
    id: string;
    displayName: string;
    role: "VIEWER" | "ADMIN" | "OWNER";
    avatarUrl: string | null;
  };
};

export const staffRoute = express.Router();

staffRoute.get("/me", requireStaff, (req, res) => {
  const staffReq = req as StaffRequest;

  return res.status(200).json({
    staff: staffReq.staff,
  });
});
