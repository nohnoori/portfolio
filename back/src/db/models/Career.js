import { CareerModel } from "../schemas/career";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }
  static async findById({ id }) {
    const career = await CareerModel.findOne({ id });
    return career;
  }
  static async findByUserId({ user_id }) {
    const career = await CareerModel.find({ user_id });
    return career;
  }
}

export { Career };
