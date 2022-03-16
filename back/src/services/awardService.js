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

  static async getAward({ id }) {
    const award = await Award.findById({ id })

    if (!award) {
      const errorMessage = "해당 글은 존재하지 않습니다."
      return { errorMessage }
    }

    return award
  }

  static async getAwards({ user_id }) {
    const awards = await Award.findByuserId({ user_id });
    return awards;
  }

}

export { awardService }