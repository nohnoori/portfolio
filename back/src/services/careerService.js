import { v4 as uuidv4 } from "uuid";
import { Career } from "../db/models/Career";

class CareerAuthService {
  //career 추가
  static async addCareer({ user_id, title, description, from_date, to_date }) {
    const id = uuidv4();
    const newCareer = { id, user_id, title, description, from_date, to_date };

    //db에 저장
    const createdNewCareer = await Career.create({ newCareer });
    return createdNewCareer;
  }

  //career 상세 조회
  static async getCareer({ id }) {
    const career = await Career.findById({ id });

    if (!career) {
      const errorMessage = "해당 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    return career;
  }

  //career 목록 조회
  static async getCareers({ user_id }) {
    const careers = await Career.findByUserId({ user_id });

    if (!careers) {
      const errorMessage = "해당 사용자의 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    return careers;
  }

  //career 수정
  static async setCareer({ id, toUpdate }) {
    let career = await Career.findById({ id });

    if (!career) {
      const errorMessage = "해당 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      career = await Career.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      career = await Career.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      career = await Career.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      career = await Career.update({ id, fieldToUpdate, newValue });
    }

    return career;
  }
}

export { CareerAuthService };
