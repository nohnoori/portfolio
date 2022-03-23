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
      required: true,
    },
    tags: {
      type: [String],
      required: true,
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
