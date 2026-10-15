import { model, Schema } from "mongoose";

interface IFlow {
  siteId: string;
  baseUrl: string;
  totalSteps: number;
  steps: unknown[];
}

const flowSchema = new Schema<IFlow>(
  {
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
      type: [Schema.Types.Mixed],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "flows",
  },
);

export const Flow = model<IFlow>("Flow", flowSchema);
