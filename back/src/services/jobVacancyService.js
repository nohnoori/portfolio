import { v4 as uuidv4 } from "uuid";
import { JobVacancy } from "../db";

class JobVacancyAuthService {
  //jobVacancy 추가
  static async addJobVacancy({ company_id, jobname, description, tags, open }) {
    const id = uuidv4();
    const newJobVacancy = { id, company_id, jobname, description, tags, open };

    const createdNewJobVacancy = await JobVacancy.create({
      newJobVacancy,
    });

    return createdNewJobVacancy;
  }

  //jobVacancy 전체 조회
  static async getAll() {
    const jobVacancies = await JobVacancy.findAll();
    return jobVacancies;
  }
}
export { JobVacancyAuthService };
