"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flow = void 0;
const mongoose_1 = require("mongoose");
const flowSchema = new mongoose_1.Schema({
    siteId: {
        type: String,
        required: true,
        unique: true,
    },
    baseUrl: {
        type: String,
        required: true,
    },
    totalSteps: {
        type: Number,
        required: true,
    },
    steps: {
        type: [mongoose_1.Schema.Types.Mixed],
        required: true,
        default: [],
    },
}, {
    timestamps: true,
    collection: "flows",
});
exports.Flow = (0, mongoose_1.model)("Flow", flowSchema);
