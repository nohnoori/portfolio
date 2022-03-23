import { v4 as uuidv4 } from "uuid";
import { Career } from "../db/models/Career";

class CareerAuthService {
  //career 추가
  static async addCareer({ company_id, jobname, description, tags, open }) {
    const id = uuidv4();
    const newCareer = { id, company_id, jobname, description, tags, open };

    //db에 저장
    const createdNewCareer = await Career.create({ newCareer });
    return createdNewCareer;
  }
}

export { CareerAuthService };
