import { v4 as uuidv4 } from "uuid";
import { Project } from "../db"

class projectService {
  static async addProject({ user_id, title, description, from_date, to_date }) {

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, user_id, title, description, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    console.log(createdNewProject)

    return createdNewProject;
  }
  static async getProject({ id }) {
    const project = await Project.findById({ id })

    if (!project) {
      const errorMessage = "해당 글은 존재하지 않습니다."
      return { errorMessage }
    }

    return project
  }

}

export { projectService }