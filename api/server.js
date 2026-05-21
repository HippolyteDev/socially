import express from "express";
import "dotenv/config";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { myPrisma } from "./prisma.js";
import cors from "cors";

const app = express();
const port = 3005;

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

// Faire un health plus complets plus tard //
app.get("/health", async (req, res) => {
  const usersCount = await myPrisma.user.count();
  res.status(200).json({ status: "ok", usersCount });
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
