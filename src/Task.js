export default class Task {
  constructor (name, description, dueDate, priority, project) {
    this.name = name
    this.description = description
    this.dueDate = dueDate
    this.priority = priority === 'on' ? 'on' : 'off'
    this.project = project
  }

  getName () {
    return this.name
  }

  setName (name) {
    this.name = name
  }

  setDescription (desc) {
    this.description = desc
  }

  getDescription () {
    return this.description
  }

  setDueDate (date) {
    this.dueDate = date
  }

  getDueDate () {
    return this.dueDate
  }

  getPriority () {
    return this.priority
  }

  setProject (project) {
    this.project = project
  }

  getProject () {
    return this.project
  }
}
