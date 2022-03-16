import { v4 as uuidv4 } from "uuid";
import { Award } from "../db"

class awardService {
  static async addAward({ user_id, title, description }) {

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    console.log(createdNewAward)

    return createdNewAward;
  }
}

export { awardService }