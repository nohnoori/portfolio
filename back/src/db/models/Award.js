import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }
  static async findById({ id }) {
    const award = await AwardModel.findOne({ id });
    return award;
  }
  static async findByuserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

}

export { Award };
