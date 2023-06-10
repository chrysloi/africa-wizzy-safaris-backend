import { InferSchemaType, Schema, model } from "mongoose";

const PackageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    happenigDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    costCovers: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

type Package = InferSchemaType<typeof PackageSchema>;

export const Package = model<Package>("Package", PackageSchema);
