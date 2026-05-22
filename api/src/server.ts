import "dotenv/config";
import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { myPrisma } from "./prisma.js";
import { auth } from "./auth.js";
import { bootstrapRoute } from "./routes/bootstrapOwner.js";
import { staffRoute } from "./routes/staff.js";

const app = express();
const port = Number(process.env.PORT ?? 3005);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/bootstrap-owner", bootstrapRoute);
app.use("/api/staff", staffRoute);

app.get("/health", async (_req, res) => {
  const usersCount = await myPrisma.user.count();

  res.status(200).json({
    status: "ok",
    usersCount,
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
