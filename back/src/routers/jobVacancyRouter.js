import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { JobVacancyAuthService } from "../services/JobVacancyService";
import is from "@sindresorhus/is";

const jobVacancyAuthRouter = Router();
jobVacancyAuthRouter.use(login_required);

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

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
jobVacancyAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { jobVacancyAuthRouter };
