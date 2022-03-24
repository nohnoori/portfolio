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
        default: "설정 된 홈페이지가 없습니다.",
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
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const CompanyModel = model("Company", CompanySchema);

export { CompanyModel };
