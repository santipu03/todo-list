import Task from "./Task";
import Project from "./Project";
import { renderTask,renderProject,updateModalSelectors } from "./UI/Render";
import { getLocalStorage, setProjectInStorage, setTaskInStorage, setLocalStorage} from "./Storage";
import { renderErrorMsg,clearForm } from "./UI/Render";



const createTask = (title,description,date,priority,project) => {
    let task = new Task(title,description,date,priority,project); 
    setTaskInStorage(task);
    return task
}

const createProject = (name) => {
    let project = new Project(name);
    if (setProjectInStorage(project)){
        updateModalSelectors(name);
        return project
    } return false
    
}
 

const createDefaultContent = () => {

    createProject("No Project");
    createProject("DApp");
    createProject("Clean House");

    createTask("Do the washing up","Use the appropiate dishwasher","2022-04-29","off","Clean House")
    createTask("Debug the smart contract","","2022-05-01","on","DApp");
    createTask("Vacuuming the basement","","2022-04-30","off","Clean House");
    createTask("Shitt","","2022-07-03","on","Clean House")

}

const removeDefaultProjectFromScreen = () => document.querySelector(".projects-container").firstElementChild.remove();

const displayContentInStorage = () => {
    displayProjectsInStorage();
    displayTasksInStorage();
}

const displayProjectsInStorage = () => {
    let todoList = getLocalStorage();
    todoList.getProjects().forEach(project => {
        renderProject(project);
        updateModalSelectors(project.getName());
    });
    removeDefaultProjectFromScreen();
    
}

const displayTasksInStorage = () => {
    let todoList = getLocalStorage();
    todoList.getProjects().forEach(project => project.getTasks().forEach(task => renderTask(task)));
}

const displayTasksOfProjects = (projectName) => {
    let todoList = getLocalStorage();
    let projectToDisplay = todoList.getProjects().find(project => project.getName() == projectName);
    projectToDisplay.getTasks().forEach(task => renderTask(task));
}

const displayPriorityTasks = () => {
    let todoList = getLocalStorage();
    let taskToDisplay = todoList.getProjects().forEach(project => project.getTasks().forEach(task => {
        if (task.getPriority() === "on"){
            renderTask(task);
        }
    }))
};

const getTaskByName = (name) => {
    let returnTask;
    getLocalStorage().getProjects().forEach(project => project.getTasks().forEach(task => {
        if (task.getName() === name){
            returnTask = task
        }
    }))
    return returnTask;
}

const getProjectOfTask = (taskName) => {
    let projectName;
    getLocalStorage().getProjects().forEach(project => {
        if (project.getTask(taskName)){
            projectName = project.getName();
        }
    })
    return projectName
}

const deleteTaskFromStorage = (taskName) => {
    let projectName = getProjectOfTask(taskName);
    let todoList = getLocalStorage();
    let project = todoList.getProjects().find(project => project.getName() === projectName);
    project.removeTask(taskName);
    setLocalStorage(todoList);
}


const getFormData = (id) => {
    const formData = new FormData(document.getElementById(id));
    let title = formData.get("title");
    let description = formData.get("description");
    let date = formData.get("date");
    let project = formData.get("project");
    let priority = formData.get("priority");

    return [title,description,date,project,priority];
}

const formValidation = (title) => (title.length < 2) ? false : true;



export {createDefaultContent,displayContentInStorage,displayTasksInStorage,displayTasksOfProjects,displayPriorityTasks,createTask,createProject,getFormData,formValidation,getTaskByName,deleteTaskFromStorage} 