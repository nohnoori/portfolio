import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CareerAuthService } from "../services/careerService";
import is from "@sindresorhus/is";

const careerAuthRouter = Router();
careerAuthRouter.use(login_required);

//career 추가 API
careerAuthRouter.post("/career", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    const newCareer = await CareerAuthService.addCareer({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    if (newCareer.errorMessage) {
      throw new Error(newCareer.errorMessage);
    }

    res.status(200).json(newCareer);
  } catch (error) {
    next(error);
  }
});

//career 상세 조회 API
careerAuthRouter.get("/career/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const career = await CareerAuthService.getCareer({
      id,
    });

    if (career.errorMessage) {
      throw new Error(career.errorMessage);
    }

    res.status(200).json(career);
  } catch (error) {
    next(error);
  }
});

//career 목록 조회 API
careerAuthRouter.get("/careers/:user_id", async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const careers = await CareerAuthService.getCareers({ user_id });

    if (careers.errorMessage) {
      throw new Error(careers.errorMessage);
    }

    res.status(200).json(careers);
  } catch (error) {
    next(error);
  }
});

//career 수정 API
careerAuthRouter.put("/career/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const toUpdate = { ...req.body };

    const updatedCareer = await CareerAuthService.setCareer({ id, toUpdate });

    if (updatedCareer.errorMessage) {
      throw new Error(updatedCareer.errorMessage);
    }

    res.status(200).json(updatedCareer);
  } catch (error) {
    next(error);
  }
});

//career 삭제 API
careerAuthRouter.delete("/career/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedCareer = await CareerAuthService.deleteCareer({ id });

    res.status(200).json(deletedCareer);
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
careerAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { careerAuthRouter };
