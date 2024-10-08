import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    is_verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export const user = model<User>("User", userSchema);
