import { model, Schema } from "mongoose";

type RequestStatus = "RUNNING" | "SUCCESS" | "NO_VALUE_FOUND" | "FAILED";

interface IGuidelineRequest {
  inputs: {
    zone?: string;
    sroName?: string;
    village?: string;
    surveyNumber?: string;
    streetName?: string;
  };
  status: RequestStatus;
  flowUsed?: string | null;
  attempts: unknown[];
  screenshots: unknown[];
  result?: unknown;
  errorMessage?: string | null;
}

const guidelineRequestSchema = new Schema<IGuidelineRequest>(
  {
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
      type: [Schema.Types.Mixed],
      default: [],
    },
    screenshots: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    result: {
      type: Schema.Types.Mixed,
      default: null,
    },
    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "guideline_requests",
  },
);

export const GuidelineRequest = model<IGuidelineRequest>(
  "GuidelineRequest",
  guidelineRequestSchema,
);
