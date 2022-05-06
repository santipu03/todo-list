import { compareAsc } from 'date-fns'
import { getLocalStorage } from './Storage'

export default class Project {
  constructor (name) {
    this.name = name
    this.tasks = []
  }

  getName () {
    return this.name
  }

  setName (name) {
    this.name = name
  }

  setTasks (tasks) {
    this.tasks = tasks
  }

  addTask (newTask) {
    // Get list of all tasks
    const taskList = []
    getLocalStorage()
      .getProjects()
      .forEach((project) =>
        project.getTasks().forEach((task) => taskList.push(task))
      )

    // Check if the name of the new task is the same as some of the existing ones, if true don't add it
    if (taskList.find((task) => task.getName() === newTask.name)) {
      return
    }
    this.tasks.push(newTask)
  }

  getTasks () {
    return this.tasks
  }

  getTask (name) {
    return this.tasks.find((task) => task.getName() === name)
  }

  removeTask (taskName) {
    this.tasks = this.tasks.filter((task) => task.getName() !== taskName)
  }

  sortTasksByDate () {
    this.tasks.sort((a, b) =>
      compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate()))
    )
  }
}
