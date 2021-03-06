import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { JobVacancyAuthService } from "../services/jobVacancyService";
import is from "@sindresorhus/is";

const jobVacancyAuthRouter = Router();
jobVacancyAuthRouter.use(login_required);

//jobVacancy 추가 API
jobVacancyAuthRouter.post("/jobVacancy", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const company_id = req.body.company_id;
    const jobname = req.body.jobname;
    const description = req.body.description;
    const tags = req.body.tags;
    const open = req.body.open;

    const newJobVacancy = await JobVacancyAuthService.addJobVacancy({
      company_id,
      jobname,
      description,
      tags,
      open,
    });

    if (newJobVacancy.errorMessage) {
      throw new Error(newJobVacancy.errorMessage);
    }

    res.status(200).json(newJobVacancy);
  } catch (error) {
    next(error);
  }
});

//jobVacancy 전체 조회 API
jobVacancyAuthRouter.get("/jobVacancies", async (req, res, next) => {
  try {
    const jobVacancies = await JobVacancyAuthService.getAll();

    res.status(200).json(jobVacancies);
  } catch (error) {
    next(error);
  }
});

//jobVacancy 상세 조회 API
jobVacancyAuthRouter.get("/jobVacancy/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const jobVacancy = await JobVacancyAuthService.getJobVacancy({ id });

    if (jobVacancy.errorMessage) {
      throw new Error(jobVacancy.errorMessage);
    }

    res.status(200).json(jobVacancy);
  } catch (error) {
    next(error);
  }
});

//jobVacancy 목록 조회 API
jobVacancyAuthRouter.get(
  "/jobVacancies/:company_id",
  async (req, res, next) => {
    try {
      const company_id = req.params.company_id;

      const jobVacancies = await JobVacancyAuthService.getJobVacancies({
        company_id,
      });

      if (jobVacancies.errorMessage) {
        throw new Error(jobVacancies.errorMessage);
      }

      res.status(200).json(jobVacancies);
    } catch (error) {
      next(error);
    }
  }
);

//jobVacancy 삭제
jobVacancyAuthRouter.delete("/jobVacancy/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    const deletedJobVacancy = await JobVacancyAuthService.deleteJobVacancy({
      id,
    });

    res.status(200).json(deletedJobVacancy);
  } catch (error) {
    next(error);
  }
});

//jobVacancy 수정 API
jobVacancyAuthRouter.put("/jobVacancy/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const toUpdate = { ...req.body };

    const jobVacancy = await JobVacancyAuthService.setJobVacancy({
      id,
      toUpdate,
    });

    if (jobVacancy.errorMessage) {
      throw new Error(jobVacancy.errorMessage);
    }

    res.status(200).json(jobVacancy);
  } catch (error) {
    next(error);
  }
});

//jobVacancy applicants 조회 API
jobVacancyAuthRouter.get(
  "/jobVacancy/:id/applicants",
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const applicants = await JobVacancyAuthService.getApplicants({ id });

      if (applicants.errorMessage) {
        throw new Error(applicants.errorMessage);
      }

      res.status(200).json(applicants);
    } catch (error) {
      next(error);
    }
  }
);

//jobVacancy applicants 수정 API
jobVacancyAuthRouter.put(
  "/jobVacancy/:id/applicants",
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const userId = req.body.userId;

      const jobVacancy = await JobVacancyAuthService.setApplicants({
        id,
        userId,
      });
      if (jobVacancy.errorMessage) {
        res.status(200).json(jobVacancy);
      } else {
        res.status(200).json(jobVacancy);
      }
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
jobVacancyAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { jobVacancyAuthRouter };
