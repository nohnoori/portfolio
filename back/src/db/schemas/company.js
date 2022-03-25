import { Schema, model } from "mongoose";

const CompanySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: {
        img: {
          type: String,
          required: false,
          default: "default-profile.png",
        },
        location: {
          type: String,
          required: true,
        },
        headCount: {
          type: Number,
          required: true,
        },
        homepage: {
          type: String,
          required: false,
          default: "홈페이지가 아직 설정되지 않았습니다. 추가해주세요.",
        },
        summary: {
          type: String,
          required: true,
        },
        benefit: {
          type: String,
          required: true,
        },
        detail: {
          type: String,
          required: true,
        },
      },
      required: false,
      default: {
        location: "위치가 아직 설정되지 않았습니다. 추가해주세요.",
        headCount: 0,
        summary: "간단 설명이 아직 설정되지 않았습니다. 추가해주세요.",
        benefit: "복지가 아직 설정되지 않았습니다. 추가해주세요.",
        detail: "상세 설명이 아직 설정되지 않았습니다. 추가해주세요.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = model("Company", CompanySchema);

export { CompanyModel };
