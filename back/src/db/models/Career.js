import { CareerModel } from "../schemas/career";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }
}

export { Career };
