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

    const newCareer = await CareerAuthService.addCareer({
      user_id,
      title,
      description,
    });

    if (newCareer.errorMessage) {
      throw new Error(newCareer.errorMessage);
    }

    res.status(200).json(newCareer);
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
