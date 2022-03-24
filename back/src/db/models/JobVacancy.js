import { JobVacancyModel } from "../schemas/jobVacancy";

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
}

export { JobVacancy };
