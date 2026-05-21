import "dotenv/config";
import cors from "cors";
import express from "express";
import { myPrisma } from "./prisma.js";

const app = express();
const port = Number(process.env.PORT ?? 3005);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

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
