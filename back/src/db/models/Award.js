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

}

export { Award };
