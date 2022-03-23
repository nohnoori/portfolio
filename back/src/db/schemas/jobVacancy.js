import { Schema, model } from "mongoose";

const CareerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: true,
    },
    jobname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    tags: {
      type: [String],
      required: false,
    },
    open: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CareerModel = model("Career", CareerSchema);

export { CareerModel };
