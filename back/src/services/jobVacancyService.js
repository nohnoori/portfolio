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

  //jobVacancy 상세 조회
  static async getJobVacancy({ id }) {
    const jobVacancy = await JobVacancy.findById({ id });

    if (!jobVacancy) {
      const errorMessage = "해당 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    return jobVacancy;
  }

  //jobVacancy 목록 조회
  static async getJobVacancies({ company_id }) {
    const jobVacancies = await JobVacancy.findByCompanyId({ company_id });

    if (!jobVacancies) {
      const errorMessage = "해당 유저의 채용 공고가 존재하지 않습니다.";
      return { errorMessage };
    }

    return jobVacancies;
  }

  //jobVacancy 수정
  static async setJobVacancy({ id, toUpdate }) {
    let jobVacancy = await JobVacancy.findById({ id });

    if (!jobVacancy) {
      const errorMessage = "채용공고 내역이 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.jobname) {
      const fieldToUpdate = "jobname";
      const newValue = toUpdate.jobname;
      jobVacancy = await JobVacancy.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      jobVacancy = await JobVacancy.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.tags) {
      const fieldToUpdate = "tags";
      const newValue = toUpdate.tags;
      jobVacancy = await JobVacancy.update({ id, fieldToUpdate, newValue });
    }
    if (toUpdate.open) {
      const fieldToUpdate = "open";
      const newValue = toUpdate.open;
      jobVacancy = await JobVacancy.update({ id, fieldToUpdate, newValue });
    }

    return jobVacancy;
  }
}
export { JobVacancyAuthService };
