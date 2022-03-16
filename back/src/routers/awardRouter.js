import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import is from "@sindresorhus/is";

const awardAuthRouter = Router();
awardAuthRouter.use(login_required);


awardAuthRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id
    const title = req.body.title;
    const description = req.body.description;

    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
    })

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(200).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardAuthRouter.get(
  "/awards/:id",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.id
      const currentAwardInfo = await awardService.getAward({
        id,
      });

      if (currentAwardInfo.errorMessage) {
        throw new Error(currentAwardInfo.errorMessage);
      }

      res.status(200).json(currentAwardInfo);
    } catch (error) {
      next(error);
    }
  }
);

awardAuthRouter.get(
  "/awardlist/:user_id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.user_id
      // 사용자의 수상 목록을 얻음
      const awards = await awardService.getAwards({ user_id });
      res.status(200).json(awards);
    } catch (error) {
      next(error);
    }
  }
);


// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
awardAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { awardAuthRouter };