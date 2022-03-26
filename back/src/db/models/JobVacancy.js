import { JobVacancyModel } from "../schemas/jobVacancy";
import { UserModel } from "../schemas/user";

class JobVacancy {
  static async create({ newJobVacancy }) {
    const createdNewJobVacancy = await JobVacancyModel.create(newJobVacancy);
    return createdNewJobVacancy;
  }
  static async findAll() {
    const jobVacancies = await JobVacancyModel.find({});
    return jobVacancies;
  }
  static async findById({ id }) {
    const jobVacancy = await JobVacancyModel.findOne({ id });
    return jobVacancy;
  }
  static async findByCompanyId({ company_id }) {
    const jobVacancies = await JobVacancyModel.find({ company_id });
    return jobVacancies;
  }
  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedJobVacancy = await JobVacancyModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedJobVacancy;
  }
  static async delete({ id }) {
    const deletedJobVacancy = await JobVacancyModel.deleteOne({ id });
    return deletedJobVacancy;
  }

  static async findApplicantsById({ id }) {
    const jobVacancy = await JobVacancyModel.findOne({ id });
    await UserModel.populate(jobVacancy, { path: "applicants" });
    const { applicants } = jobVacancy;
    return applicants;
  }

  static async updateApplicants({ id, userId }) {
    console.log("here");
    const user = await UserModel.findOne({ id: userId });
    console.log(user);
    const updatedJobVacancy = await JobVacancyModel.updateOne(
      { id },
      { $push: { applicants: user } }
    );

    return updatedJobVacancy;
  }
}

export { JobVacancy };
