import { v4 as uuidv4 } from "uuid";
import { Project } from "../db"

class projectService {
  //project 추가
  static async addProject({ user_id, title, description, from_date, to_date }) {

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    console.log(createdNewProject)

    return createdNewProject;
  }

  //project 조회
  static async getProject({ id }) {
    const project = await Project.findById({ id })

    if (!project) {
      const errorMessage = "해당 글은 존재하지 않습니다."
      return { errorMessage }
    }

    return project
  }

  //project 목록 조회
  static async getProjects({ user_id }) {
    const projects = await Project.findByuserId({ user_id })

    if (!projects) {
      const errorMessage = "해당 사용자의 글이 존재하지 않습니다."
      return { errorMessage }
    }

    return projects
  }

}

export { projectService }