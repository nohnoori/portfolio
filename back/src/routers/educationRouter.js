import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

educationAuthRouter.use(login_required);

// Education MVP 생성 API
educationAuthRouter.post("/education/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req에서 데이터 가져오기
    const user_id = req.body.user_id;
    const school = req.body.school;
    const major = req.body.major;
    const position = req.body.position;

    // 위 데이터를 Education db에 추가하기
    const newEducation = await EducationAuthService.addEducation({
      user_id,
      school,
      major,
      position,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(201).json(newEducation);
  } catch (e) {
    next(e);
  }
});


// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
educationAuthRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { educationAuthRouter };
