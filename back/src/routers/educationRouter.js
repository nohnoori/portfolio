import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { EducationAuthService } from "../services/educationService";

const educationAuthRouter = Router();

educationAuthRouter.use(login_required);

// Education MVP 생성 API
educationAuthRouter.post("/education", async (req, res, next) => {
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
    const schoolLevel = req.body.schoolLevel;

    // 위 데이터를 Education db에 추가하기
    const newEducation = await EducationAuthService.addEducation({
      user_id,
      school,
      major,
      position,
      schoolLevel,
    });

    if (newEducation.errorMessage) {
      throw new Error(newEducation.errorMessage);
    }

    res.status(200).json(newEducation);
  } catch (e) {
    next(e);
  }
});

// Education MVP 조회 API
educationAuthRouter.get("/education/:id", async (req, res, next) => {
  try {
    // URL로부터 추출한 education id를 가지고 db에서 education 정보를 찾음
    const id = req.params.id;
    const education = await EducationAuthService.getEducation({ id });

    if (education.errorMessage) {
      throw new Error(education.errorMessage);
    }

    res.status(200).json(education);
  } catch (e) {
    next(e);
  }
});

// Education MVP 수정 API
educationAuthRouter.put("/education/:id", async (req, res, next) => {
  try {
    // URL로부터 education id를 추출
    const id = req.params.id;

    const toUpdate = { ...req.body };

    const updatedEducation = await EducationAuthService.setEducation({
      id,
      toUpdate,
    });

    if (updatedEducation.errorMessage) {
      throw new Error(updatedEducation.errorMessage);
    }

    res.status(200).json(updatedEducation);
  } catch (e) {
    next(e);
  }
});

// Education MVP 목록 조회 API
educationAuthRouter.get("/educations/:user_id", async (req, res, next) => {
  try {
    // URL로부터 추출한 user_id를 가지고 db에서 education list를 찾음
    const user_id = req.params.user_id;
    const educations = await EducationAuthService.getEducations({
      user_id,
    });

    res.status(200).json(educations);
  } catch (e) {
    next(e);
  }
});

// Education MVP 삭제 API
educationAuthRouter.delete("/education/:id", async (req, res, next) => {
  try {
    // URL로부터 education id를 추출
    const id = req.params.id;
    // 해당 education 삭제
    const deletedEducation = await EducationAuthService.deleteEducation({ id });

    res.status(200).json(deletedEducation);
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
educationAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { educationAuthRouter };
