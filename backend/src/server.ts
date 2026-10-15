import { connectDatabase } from "./config/database";
import flowRoutes from "./routes/flowRoutes";
import guidelineRequestRoutes from "./routes/guidelineRequestRoutes";
import "dotenv/config";

import cors from "cors";
import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use("/api/flows", flowRoutes);
app.use("/api/guideline-requests", guidelineRequestRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "tn-guideline-value-fetcher-api",
  });
});

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
