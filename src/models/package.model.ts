import { InferSchemaType, Schema, model } from "mongoose";

const DaySchema = new Schema({
  day: String,
  details: String,
  startTime: String,
  endTime: String,
  included: [{ title: String, details: String }],
});

const PackageSchema = new Schema(
  {
    title: String,
    coverImage: String,
    details: String,
    departureTime: String,
    returnTime: String,
    travelMode: String,
    cost: String,
    published: {
      type: Boolean,
      default: false,
    },
    days: [DaySchema],
    daysNumber: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

type Package = InferSchemaType<typeof PackageSchema>;

export const Package = model<Package>("Package", PackageSchema);
