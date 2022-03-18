import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import is from "@sindresorhus/is";

const projectAuthRouter = Router();
projectAuthRouter.use(login_required);

//project 추가 API
projectAuthRouter.post("/project/create", async function (req, res, next) {
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
    const from_date = req.body.from_date
    const to_date = req.body.to_date

    const newProject = await projectService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date
    })

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

//project 조회 API
projectAuthRouter.get("/projects/:id", async function (req, res, next) {
  try {
    //:id 값 가져오기
    const id = req.params.id

    //project 정보 가져오기
    const currentPrjoectInfo = await projectService.getProject({
      id,
    });

    if (currentPrjoectInfo.errorMessage) {
      throw new Error(currentPrjoectInfo.errorMessage);
    }

    res.status(200).json(currentPrjoectInfo);
  } catch (error) {
    next(error);
  }
}
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
projectAuthRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { projectAuthRouter };