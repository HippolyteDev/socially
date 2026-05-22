import express from "express";
import "dotenv/config";
import { auth } from "../auth.js";
import { myPrisma } from "../prisma.js";

export const bootstrapRoute = express.Router();

bootstrapRoute.post("/", async (req, res) => {
  if (!process.env.STAFF_OWNER_EMAIL) {
    return res.status(500).json({ error: "Email Owner pas présent" });
  }

  const webHeaders = new Headers(req.headers as Record<string, string>);
  const session = await auth.api.getSession({ headers: webHeaders });

  if (!session) {
    return res.status(401).json({ error: "Non authentifié" });
  }

  const ownerEmail = process.env.STAFF_OWNER_EMAIL.trim().toLowerCase();
  const receivedEmail = session.user.email.toLowerCase();

  if (ownerEmail !== receivedEmail) {
    return res
      .status(403)
      .json({ error: "Votre email n'est pas celui de owner" });
  }

  const existingStaff = await myPrisma.staffProfile.findFirst({
    where: { deletedAt: null },
    select: { id: true },
  });

  if (existingStaff) {
    return res.status(409).json({ error: "Owner déjà initialisé" });
  }

  try {
    await myPrisma.staffProfile.create({
      data: {
        displayName: session.user.name,
        avatarUrl: session.user.image ?? undefined,
        userId: session.user.id,
        role: "OWNER",
      },
    });
  } catch (error) {
    return res.status(500).json({ error: `Erreur création owner : ${error}` });
  }

  return res.status(201).json({ ok: true });
});
