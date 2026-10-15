"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Flow_1 = require("../models/Flow");
const router = (0, express_1.Router)();
router.get("/:siteId", async (req, res) => {
    try {
        const flow = await Flow_1.Flow.findOne({ siteId: req.params.siteId }).lean();
        if (!flow) {
            res.status(404).json({ error: "Flow not found" });
            return;
        }
        res.json(flow);
    }
    catch (error) {
        console.error("Failed to retrieve flow:", error);
        res.status(500).json({ error: "Failed to retrieve flow" });
    }
});
exports.default = router;
