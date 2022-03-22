import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import is from "@sindresorhus/is";

const awardAuthRouter = Router();
awardAuthRouter.use(login_required);

//award 추가 API
awardAuthRouter.post("/award/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    const newAward = await awardService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(200).json(newAward);
  } catch (error) {
    next(error);
  }
});

//award 조회 API
awardAuthRouter.get("/awards/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    //award 정보 가져오기
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
});

//award 목록 조회 API
awardAuthRouter.get("/awardlist/:user_id", async (req, res, next) => {
  try {
    //:user_id 값 가져오기
    const user_id = req.params.user_id;

    // 사용자의 수상 목록을 얻음
    const awards = await awardService.getAwards({ user_id });

    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

//award 수정 API
awardAuthRouter.put("/awards/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    // req (request) 에서 데이터 가져오기
    // undefined인 경우 null 대체
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    // 해당 수상 정보 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedAward = await awardService.setAward({ id, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (error) {
    next(error);
  }
});

//award 삭제
awardAuthRouter.delete("/award/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    const award = await awardService.deleteAward({ id });

    res.status(200).json(award);
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
awardAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { awardAuthRouter };
