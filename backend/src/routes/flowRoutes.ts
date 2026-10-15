import { Router } from "express";

import { Flow } from "../models/Flow";

const router = Router();

router.get("/:siteId", async (req, res) => {
  try {
    const flow = await Flow.findOne({ siteId: req.params.siteId }).lean();

    if (!flow) {
      res.status(404).json({ error: "Flow not found" });
      return;
    }

    res.json(flow);
  } catch (error) {
    console.error("Failed to retrieve flow:", error);
    res.status(500).json({ error: "Failed to retrieve flow" });
  }
});

export default router;
