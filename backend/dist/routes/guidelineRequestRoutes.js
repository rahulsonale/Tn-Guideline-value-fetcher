"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const node_crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const GuidelineRequest_1 = require("../models/GuidelineRequest");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const inputs = req.body?.inputs;
        if (!inputs || typeof inputs !== "object" || Array.isArray(inputs)) {
            res.status(400).json({ error: "A valid inputs object is required" });
            return;
        }
        const request = await GuidelineRequest_1.GuidelineRequest.create({
            inputs,
            status: "RUNNING",
        });
        res.status(201).json(request);
    }
    catch (error) {
        console.error("Failed to create guideline request:", error);
        res.status(500).json({ error: "Failed to create guideline request" });
    }
});
router.post("/:id/screenshot", async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            res.status(400).json({ error: "Invalid request ID" });
            return;
        }
        const { key, imageBase64 } = req.body ?? {};
        if (typeof key !== "string" || typeof imageBase64 !== "string") {
            res
                .status(400)
                .json({ error: "Screenshot key and imageBase64 are required" });
            return;
        }
        const requestExists = await GuidelineRequest_1.GuidelineRequest.exists({ _id: req.params.id });
        if (!requestExists) {
            res.status(404).json({ error: "Guideline request not found" });
            return;
        }
        const base64 = imageBase64.replace(/^data:image\/png;base64,/, "");
        const imageBuffer = Buffer.from(base64, "base64");
        const pngSignature = Buffer.from([
            0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
        ]);
        if (imageBuffer.length < 8 ||
            !imageBuffer.subarray(0, 8).equals(pngSignature)) {
            res.status(400).json({ error: "The uploaded image is not a valid PNG" });
            return;
        }
        const fileName = `${req.params.id}-${(0, node_crypto_1.randomUUID)()}.png`;
        const uploadsDirectory = node_path_1.default.resolve(process.cwd(), "uploads");
        await (0, promises_1.mkdir)(uploadsDirectory, { recursive: true });
        await (0, promises_1.writeFile)(node_path_1.default.join(uploadsDirectory, fileName), imageBuffer);
        const screenshot = {
            key,
            filePath: node_path_1.default.posix.join("uploads", fileName),
            createdAt: new Date(),
        };
        await GuidelineRequest_1.GuidelineRequest.findByIdAndUpdate(req.params.id, {
            $push: { screenshots: screenshot },
        });
        res.status(201).json({ screenshot });
    }
    catch (error) {
        console.error("Failed to save screenshot:", error);
        res.status(500).json({ error: "Failed to save screenshot" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose_1.default.isValidObjectId(req.params.id)) {
            res.status(400).json({ error: "Invalid request ID" });
            return;
        }
        const request = await GuidelineRequest_1.GuidelineRequest.findById(req.params.id).lean();
        if (!request) {
            res.status(404).json({ error: "Guideline request not found" });
            return;
        }
        res.json(request);
    }
    catch (error) {
        console.error("Failed to retrieve guideline request:", error);
        res.status(500).json({ error: "Failed to retrieve guideline request" });
    }
});
exports.default = router;
