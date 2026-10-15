"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuidelineRequest = void 0;
const mongoose_1 = require("mongoose");
const guidelineRequestSchema = new mongoose_1.Schema({
    inputs: {
        zone: String,
        sroName: String,
        village: String,
        surveyNumber: String,
        streetName: String,
    },
    status: {
        type: String,
        enum: ["RUNNING", "SUCCESS", "NO_VALUE_FOUND", "FAILED"],
        default: "RUNNING",
        required: true,
    },
    flowUsed: {
        type: String,
        default: null,
    },
    attempts: {
        type: [mongoose_1.Schema.Types.Mixed],
        default: [],
    },
    screenshots: {
        type: [mongoose_1.Schema.Types.Mixed],
        default: [],
    },
    result: {
        type: mongoose_1.Schema.Types.Mixed,
        default: null,
    },
    errorMessage: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    collection: "guideline_requests",
});
exports.GuidelineRequest = (0, mongoose_1.model)("GuidelineRequest", guidelineRequestSchema);
