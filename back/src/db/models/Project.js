import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }
  static async findById({ id }) {
    const project = await ProjectModel.findOne({ id });
    return project;
  }

}

export { Project };
