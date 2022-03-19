import { v4 as uuidv4 } from "uuid";
import { Award } from "../db";

class awardService {
  //award 추가
  static async addAward({ user_id, title, description }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    console.log(createdNewAward);

    return createdNewAward;
  }

  //award 조회
  static async getAward({ id }) {
    const award = await Award.findById({ id });

    if (!award) {
      const errorMessage = "해당 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    return award;
  }

  //award 목록 조회
  static async getAwards({ user_id }) {
    const awards = await Award.findByuserId({ user_id });
    return awards;
  }

  //award 수정
  static async setAward({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage = "글 내역이 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ id, fieldToUpdate, newValue });
    }

    return award;
  }
}

export { awardService };
