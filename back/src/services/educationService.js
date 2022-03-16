import { Education } from "../db"; 
import { v4 as uuidv4 } from "uuid";

class EducationAuthService {
  static async addEducation({ user_id, school, major, position, }) {
    const id = uuidv4();

    const newEducation = { id, user_id, school, major, position };
    const createdNewEducation = await Education.create({newEducation});

    return createdNewEducation;
  }

  static async getEducationInfo({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage =
        "해당 학력이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }
}

export { EducationAuthService };
