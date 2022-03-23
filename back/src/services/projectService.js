import { v4 as uuidv4 } from "uuid";
import { Project } from "../db";

class ProjectAuthService {
  //project 추가
  static async addProject({ user_id, title, description, from_date, to_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    console.log(createdNewProject);

    return createdNewProject;
  }

  //project 조회
  static async getProject({ id }) {
    const project = await Project.findById({ id });

    if (!project) {
      const errorMessage = "해당 글은 존재하지 않습니다.";
      return { errorMessage };
    }

    return project;
  }

  //project 목록 조회
  static async getProjects({ user_id }) {
    const projects = await Project.findByUserId({ user_id });

    if (!projects) {
      const errorMessage = "해당 사용자의 글이 존재하지 않습니다.";
      return { errorMessage };
    }

    return projects;
  }

  //project 수정
  static async setProject({ id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let project = await Project.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage = "프로젝트 내역이 없습니다.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({ id, fieldToUpdate, newValue });
    }

    return project;
  }

  //project 삭제
  static async deleteProject({ id }) {
    const project = await Project.delete({ id });
    return project;
  }
}

export { ProjectAuthService };
