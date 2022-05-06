export default class TodoList {
  constructor () {
    this.projects = []
  }

  getProjects () {
    return this.projects
  }

  setProjects (projects) {
    this.projects = projects
  }

  addProject (newProject) {
    if (this.projects.find((project) => project.name === newProject.name)) {
      return false
    }
    this.projects.push(newProject)
    return true
  }

  deleteProject (projectName) {
    const projectToDelete = this.projects.find(
      (project) => project.name === projectName
    )
    this.projects.splice(this.projects.indexOf(projectToDelete), 1)
  }
}
