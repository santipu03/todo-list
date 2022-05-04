import { displayPriorityTasks, displayTasksInStorage, displayTasksOfProjects, getTaskByName } from "../logic";
import { setProjectTabListeners, setAddTaskBtnEventListener,setEditTaskListener } from "./EventListeners";

let mainTitle = document.querySelector(".main-title");
const taskContainer = document.querySelector(".task-container");
const projectsContainer = document.querySelector(".projects-container");


const renderTask = (task) => {
    let editId = task.name.split(" ").join("-");
    let taskId = task.name.split(" ").join("/")
    let priorityIcon;
    (task.priority === "on") ? priorityIcon = "fa-solid fa-star" : priorityIcon = "fa-regular fa-star";
    
    let mainTask = document.createElement("div");
    mainTask.classList.add("main-task");
    mainTask.setAttribute("id",taskId);
    mainTask.innerHTML = 
    `<div>
        <input type="checkbox" name="check">
        <div class="task-name">${task.name}</div>
    </div>
    <div>
        <div class="task-date">${task.dueDate}</div>
        <i class="fa-solid fa-pen-to-square" id="${editId}"></i>
        <div class="priority"><i class="${priorityIcon}"></i></div>
    </div>`;
    taskContainer.appendChild(mainTask);
    moveAddButton();
    setEditTaskListener(editId);
}

const renderProject = (project) => {
    let tabProject = document.createElement("div");
    let id = project.getName().split(" ").join("-");

    tabProject.classList.add("tab-project");
    tabProject.setAttribute("id",id)
    tabProject.innerHTML = 
    `<i class="fa-solid fa-circle"></i>
    <div>${project.getName()}</div>
    <i class="fa-solid fa-xmark hidden"></i>`;
    projectsContainer.appendChild(tabProject);

    setProjectTabListeners(id);
}


const renderHomeTab = () => {
    mainTitle.textContent = "Home";
    clearTaskContainer();
    displayTasksInStorage();
}

const renderProjectTasks = (e) => {
    let projectTitle = e.target.textContent;
    mainTitle.textContent = projectTitle
    clearTaskContainer();
    displayTasksOfProjects(projectTitle);
}

const renderPriorityTab = () => {
    mainTitle.textContent = "Priority";
    clearTaskContainer();
    displayPriorityTasks();
}

const renderEditTaskModal = (name) => {
    let task = getTaskByName(name);
    document.querySelector(".taskInfo-modal-title").textContent = name;

    openModal(".taskInfo-modal-overlay");
    setTaskFormData(task);
}

const setTaskFormData = (task) => {
    let title = document.getElementById("edit-task-input-title");
    let inputDesc = document.getElementById("edit-task-input-desc");
    let inputDate = document.getElementById("edit-task-input-date");
    let inputProject = document.getElementById("edit-task-input-project");
    let inputPriority = document.getElementById("edit-task-input-priority");

    title.textContent = task.getName();
    inputDesc.value = task.getDescription();
    inputDate.value = task.getDueDate();
    inputProject.value = task.getProject();
    inputPriority.checked = (task.getPriority() === "on") ? true : false;

}

const clearTaskContainer = () => {
    taskContainer.innerHTML = 
    `<div class="add-task">
        <i class="fa-solid fa-plus"></i>
        <div>Add Task</div>
    </div>`;
    setAddTaskBtnEventListener();
}

const removeTaskFromScreen = (name) => {
    let id = name.split(" ").join("/");
    document.getElementById(id).remove();
};

const removeProjectFromScreen = (id) => document.getElementById(id).remove();


const moveAddButton = () => {
    const addTaskBtn = document.querySelector(".add-task");
    (addTaskBtn.nextElementSibling !== null) ? taskContainer.appendChild(addTaskBtn) : 0;
}

const renderErrorMsg = (Class,msg) => document.querySelector(Class).textContent = msg;
const clearErrorMsg = (Class) => document.querySelector(Class).textContent = "";

const openModal = Class => document.querySelector(Class).classList.add("show");
const closeModal = Class => document.querySelector(Class).classList.remove("show");

const clearForm = (id) => document.getElementById(id).reset();

const updateModalSelectors = (value) => {
    // Check if the value to add is already added to avoid repetitions

    const addTaskSelect = document.getElementById("add-task-select");
    const editTaskSelect = document.getElementById("edit-task-input-project");
    
    let children = Array.from(addTaskSelect.children);
    if (children.length === 0){
        addTaskSelect.innerHTML += `<option value="${value}">${value}</option>`;
        editTaskSelect.innerHTML += `<option value="${value}">${value}</option>`;
        return
    }

    let okey = true;
    for (let option of children){
        if (option.textContent === value){
            okey = false;
            break;
        }
    }

    if (okey) {
        addTaskSelect.innerHTML += `<option value="${value}">${value}</option>`;
        editTaskSelect.innerHTML += `<option value="${value}">${value}</option>`;
    }
}


export {renderTask,renderProject,updateModalSelectors,renderHomeTab,renderPriorityTab,closeModal,openModal,clearErrorMsg,renderEditTaskModal,renderErrorMsg,clearForm,renderProjectTasks,removeTaskFromScreen,removeProjectFromScreen}