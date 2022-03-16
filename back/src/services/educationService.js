import { Education } from "../db"; 
import { v4 as uuidv4 } from "uuid";

class EducationAuthService {
  static async addEducation({ user_id, school, major, position, }) {
    const id = uuidv4();

    const newEducation = { id, user_id, school, major, position };
    const createdNewEducation = await Education.create({newEducation});

    return createdNewEducation;
  }
}

export { EducationAuthService };
