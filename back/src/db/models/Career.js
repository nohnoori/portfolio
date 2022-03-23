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
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCareer = await CareerModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCareer;
  }
  static async delete({ id }) {
    const deletedCareer = await CareerModel.deleteOne({ id });
    return deletedCareer;
  }
}

export { Career };
