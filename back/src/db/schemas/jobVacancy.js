import { Schema, model } from "mongoose";
import UserSchema from "./user";

const JobVacancySchema = new Schema(
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
      default: true,
    },
    applicants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const JobVacancyModel = model("JobVacancy", JobVacancySchema);

export { JobVacancyModel };
