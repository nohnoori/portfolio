import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { ProjectAuthService } from "../services/projectService";
import is from "@sindresorhus/is";

const projectAuthRouter = Router();
projectAuthRouter.use(login_required);

//project 추가 API
projectAuthRouter.post("/project", async (req, res, next) => {
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
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;

    const newProject = await ProjectAuthService.addProject({
      user_id,
      title,
      description,
      from_date,
      to_date,
    });

    if (newProject.errorMessage) {
      throw new Error(newProject.errorMessage);
    }

    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

//project 조회 API
projectAuthRouter.get("/project/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    //project 정보 가져오기
    const project = await ProjectAuthService.getProject({
      id,
    });

    if (project.errorMessage) {
      throw new Error(project.errorMessage);
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

//project 목록 조회 API
projectAuthRouter.get("/projects/:user_id", async (req, res, next) => {
  try {
    //:user_id 값 가져오기
    const user_id = req.params.user_id;

    // 사용자의 프로젝트 목록을 얻음
    const projects = await ProjectAuthService.getProjects({ user_id });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

//project 수정 API
projectAuthRouter.put("/project/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    const toUpdate = { ...req.body };

    // 해당 프로젝트 정보 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updatedProject = await ProjectAuthService.setProject({
      id,
      toUpdate,
    });

    if (updatedProject.errorMessage) {
      throw new Error(updatedProject.errorMessage);
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    next(error);
  }
});

//project 삭제
projectAuthRouter.delete("/project/:id", async (req, res, next) => {
  try {
    //:id 값 가져오기
    const id = req.params.id;

    const deletedProject = await ProjectAuthService.deleteProject({ id });

    res.status(200).json(deletedProject);
  } catch (error) {
    next(error);
  }
});

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
projectAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { projectAuthRouter };
