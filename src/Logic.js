import {
  isToday,
  isThisWeek,
  isTomorrow,
  format,
  isPast,
  isYesterday,
  compareAsc,
  startOfToday,
  startOfTomorrow,
  startOfYesterday
} from 'date-fns'
import Task from './Task'
import Project from './Project'
import { renderTask, renderProject, updateModalSelectors } from './UI/Render'
import {
  getLocalStorage,
  setProjectInStorage,
  setTaskInStorage,
  setLocalStorage
} from './Storage'

const createTask = (title, description, date, priority, project) => {
  const task = new Task(title, description, date, priority, project)
  setTaskInStorage(task)
  return task
}

const createProject = (name) => {
  const project = new Project(name)
  if (setProjectInStorage(project)) {
    updateModalSelectors(name)
    return project
  }
  return false
}

const createDefaultContent = () => {
  createProject('No Project')
  createProject('DApp')
  createProject('Clean House')

  createTask(
    'Do the washing up',
    'Use the appropiate dishwasher',
    getTodayDate(),
    'off',
    'Clean House'
  )
  createTask('Debug the smart contract', '', getTomorrowDate(), 'on', 'DApp')
  createTask(
    'Vacuuming the basement',
    '',
    getYesterdayDate(),
    'off',
    'Clean House'
  )
}

const removeDefaultProjectFromScreen = () =>
  document.querySelector('.projects-container').firstElementChild.remove()

const displayContentInStorage = () => {
  displayProjectsInStorage()
  displayTasksInStorage()
}

const displayProjectsInStorage = () => {
  const todoList = getLocalStorage()
  todoList.getProjects().forEach((project) => {
    renderProject(project)
    updateModalSelectors(project.getName())
  })
  removeDefaultProjectFromScreen()
}

const displayTasksInStorage = () => {
  const tasks = []
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => {
        tasks.push(task)
      })
    )
  sortTasksByDate(tasks)
  tasks.forEach((task) => renderTask(task))
}

const displayTasksOfProjects = (projectName) => {
  const todoList = getLocalStorage()
  const projectToDisplay = todoList
    .getProjects()
    .find((project) => project.getName() === projectName)
  projectToDisplay.sortTasksByDate()
  projectToDisplay.getTasks().forEach((task) => renderTask(task))
}

const displayPriorityTasks = () => {
  const tasks = []
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => {
        if (task.getPriority() === 'on') {
          tasks.push(task)
        }
      })
    )
  sortTasksByDate(tasks)
  tasks.forEach((task) => renderTask(task))
}

const displayTodayTasks = () => {
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => {
        if (isToday(new Date(task.getDueDate()))) {
          renderTask(task)
        }
      })
    )
}

const displayWeekTasks = () => {
  const tasks = []
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => {
        if (isThisWeek(new Date(task.getDueDate()), { weekStartsOn: 1 })) {
          tasks.push(task)
        }
      })
    )
  sortTasksByDate(tasks)
  tasks.forEach((task) => renderTask(task))
}

const getTaskByName = (name) => {
  let returnTask
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => {
        if (task.getName() === name) {
          returnTask = task
        }
      })
    )
  return returnTask
}

const getProjectOfTask = (taskName) => {
  let projectName
  getLocalStorage()
    .getProjects()
    .forEach((project) => {
      if (project.getTask(taskName)) {
        projectName = project.getName()
      }
    })
  return projectName
}

const deleteTaskFromStorage = (taskName) => {
  const projectName = getProjectOfTask(taskName)
  const todoList = getLocalStorage()
  const projectOfTask = todoList
    .getProjects()
    .find((project) => project.getName() === projectName)
  projectOfTask.removeTask(taskName)
  setLocalStorage(todoList)
}

const deleteProjectFromStorage = (projectName) => {
  const todoList = getLocalStorage()
  todoList.deleteProject(projectName)
  setLocalStorage(todoList)
}

const getFormData = (id) => {
  const formData = new FormData(document.getElementById(id))
  const title = formData.get('title')
  const description = formData.get('description')
  const date = formData.get('date')
  const project = formData.get('project')
  const priority = formData.get('priority')

  return [title, description, date, project, priority]
}

const formValidation = (type, title) => {
  const tasks = []
  const projects = []
  getLocalStorage()
    .getProjects()
    .forEach((project) =>
      project.getTasks().forEach((task) => tasks.push(task))
    )
  getLocalStorage()
    .getProjects()
    .forEach((project) => projects.push(project))

  if (title.length < 1) {
    return false
  }
  if (type === 'task') {
    if (tasks.find((task) => task.getName() === title)) {
      return false
    }
  } else if (type === 'project') {
    if (projects.find((project) => project.getName() === title)) {
      return false
    }
  }
  return true
}

const formatDate = (date) => {
  if (isToday(new Date(date))) {
    return 'Today'
  }
  if (isTomorrow(new Date(date))) {
    return 'Tomorrow'
  }
  if (isYesterday(new Date(date))) {
    return 'Yesterday'
  }
  if (isPast(new Date(date))) {
    return 'Due Date has passed'
  }
  return format(new Date(date), 'dd/MM/yyyy')
}

const sortTasksByDate = (tasks) => {
  tasks.sort((a, b) =>
    compareAsc(new Date(a.getDueDate()), new Date(b.getDueDate()))
  )
  return tasks
}

const getTodayDate = () => format(startOfToday(), 'yyyy-MM-dd')
const getTomorrowDate = () => format(startOfTomorrow(), 'yyyy-MM-dd')
const getYesterdayDate = () => format(startOfYesterday(), 'yyyy-MM-dd')

export {
  createDefaultContent,
  displayContentInStorage,
  displayTasksInStorage,
  displayTasksOfProjects,
  displayPriorityTasks,
  createTask,
  createProject,
  getFormData,
  formValidation,
  getTaskByName,
  deleteTaskFromStorage,
  deleteProjectFromStorage,
  displayTodayTasks,
  displayWeekTasks,
  formatDate
}
