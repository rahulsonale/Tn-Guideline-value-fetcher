"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const flowRoutes_1 = __importDefault(require("./routes/flowRoutes"));
const guidelineRequestRoutes_1 = __importDefault(require("./routes/guidelineRequestRoutes"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 3000);
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "15mb" }));
app.use("/api/flows", flowRoutes_1.default);
app.use("/api/guideline-requests", guidelineRequestRoutes_1.default);
app.get("/api/health", (_req, res) => {
    res.json({
        ok: true,
        service: "tn-guideline-value-fetcher-api",
    });
});
async function startServer() {
    await (0, database_1.connectDatabase)();
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
}
startServer().catch((error) => {
    console.error("Failed to start backend:", error);
    process.exit(1);
});
