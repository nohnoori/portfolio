import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id });
    return education;
  }
}

export { Education };