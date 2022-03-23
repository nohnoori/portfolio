import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class EducationAuthService {
  static async addEducation({ user_id, school, major, position, schoolLevel }) {
    const id = uuidv4();

    const newEducation = { id, user_id, school, major, position, schoolLevel };
    const createdNewEducation = await Education.create({ newEducation });

    return createdNewEducation;
  }

  static async getEducation({ id }) {
    const education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "해당 학력이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return education;
  }

  static async setEducation({ id, toUpdate }) {
    // 우선 해당 id 의 education이 db에 존재하는지 여부 확인
    let education = await Education.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!education) {
      const errorMessage = "해당 학력이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 school이 있다면, 즉 school 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 major가 있다면, 즉 major 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 position이 있다면, 즉 position 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 schoolLevel이 있다면, 즉 schoolLevel 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.schoolLevel) {
      const fieldToUpdate = "schoolLevel";
      const newValue = toUpdate.schoolLevel;
      education = await Education.update({ id, fieldToUpdate, newValue });
    }

    return education;
  }

  static async getEducations({ user_id }) {
    const educations = await Education.findByUserId({ user_id });
    return educations;
  }

  static async deleteEducation({ id }) {
    const education = await Education.delete({ id });
    return education;
  }
}

export { EducationAuthService };
