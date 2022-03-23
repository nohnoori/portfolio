import { v4 as uuidv4 } from "uuid";
import { Career } from "../db/models/Career";

class CareerAuthService {
  //career 추가
  static async addCareer({ user_id, title, description }) {
    const id = uuidv4();
    const newCareer = { id, user_id, title, description };

    //db에 저장
    const createdNewCareer = await Career.create({ newCareer });
    return createdNewCareer;
  }

  //career 상세 조회
  static async;
}

export { CareerAuthService };
