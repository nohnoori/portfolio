import { JobVacancyModel } from "../schemas/jobVacancy";

class JobVacancy {
  static async create({ newJobVacancy }) {
    const createdNewJobVacancy = await JobVacancyModel.create(newJobVacancy);
    return createdNewJobVacancy;
  }
}

export { JobVacancy };
