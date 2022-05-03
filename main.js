/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });

class Project {
    constructor (name){
        this.name = name
        this.tasks = [];
    }

    getName(){
        return this.name
    }
    setName(name){
        this.name = name
    }
    setTasks(tasks) {
        this.tasks = tasks
    }
    addTask(newTask){
        if (this.tasks.find(task => task.getName() == newTask.name)) {
            return 
        }
        this.tasks.push(newTask);
    }
    getTasks(){
        return this.tasks
    }
    getTask(name){
        return this.tasks.find(task => task.getName() === name);
    }
    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => task.getName() !== taskName)
    }
}

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLocalStorage": () => (/* binding */ getLocalStorage),
/* harmony export */   "setLocalStorage": () => (/* binding */ setLocalStorage),
/* harmony export */   "setProjectInStorage": () => (/* binding */ setProjectInStorage),
/* harmony export */   "setTaskInStorage": () => (/* binding */ setTaskInStorage)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ "./src/TodoList.js");





const setLocalStorage = (todoList) => {
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

const getLocalStorage = () => {
    // First, we get the todoList from storage and assign the methods
    let todoList = Object.assign(new _TodoList__WEBPACK_IMPORTED_MODULE_2__["default"](),JSON.parse(localStorage.getItem("todoList")));

    // Then, get the projects, assign the methods with map() and set projects with methods in the array
    todoList.setProjects(todoList.getProjects().map(project => Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_0__["default"](),project)));

    // Finally, for each project, get the tasks, assign methods and set them in the array
    todoList.getProjects().forEach(project => project.setTasks(project.getTasks().map(task => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_1__["default"](),task))));

    return todoList;
}

const setProjectInStorage = (project) => {
    let todoList = getLocalStorage();
    if (todoList.addProject(project)){
        setLocalStorage(todoList);
        return true
    } return false
    
}

const setTaskInStorage = (task) => {
    let todoList = getLocalStorage();
    let projectOfTask = todoList.getProjects().find(project => project.getName() == task.getProject());
    projectOfTask.addTask(task);
    setLocalStorage(todoList);
}   




/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });

class Task {

    constructor (name,description,dueDate,priority,project){
        this.name = name
        this.description = description
        this.dueDate = dueDate
        this.priority = (priority === "on") ? "on" : "off";
        this.project = project
    }

    getName() {
        return this.name
    }
    setName(name){
        this.name = name
    }
    setDescription(desc){
        this.description = desc
    }
    getDescription(){
        return this.description
    }
    setDueDate(date){
        this.dueDate = date
    }
    getDueDate(){
        return this.dueDate;
    }
    setPriority(priority){
        this.priority = this.priority = (priority === "on") ? "on" : "off";
    }
    getPriority(){
        return this.priority
    }
    setProject(project){
        this.project = project
    }
    getProject(){
        return this.project
    }
}


/***/ }),

/***/ "./src/TodoList.js":
/*!*************************!*\
  !*** ./src/TodoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoList)
/* harmony export */ });

class TodoList {
    constructor (){
        this.projects = [];
    }

    getProjects() {
        return this.projects;
    }
    setProjects(projects){
        this.projects = projects
    }
    addProject(newProject){
        if (this.projects.find(project => project.name == newProject.name)){
            return false
        }
        this.projects.push(newProject);
        return true
    }
    deleteProject(projectName){
        let projectToDelete = this.projects.find(project => project.name == projectName);
        this.projects.splice(this.projects.indexOf(projectToDelete),1);
    }
}

/***/ }),

/***/ "./src/UI/EventListeners.js":
/*!**********************************!*\
  !*** ./src/UI/EventListeners.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setAddTaskBtnEventListener": () => (/* binding */ setAddTaskBtnEventListener),
/* harmony export */   "setDefaultEventListeners": () => (/* binding */ setDefaultEventListeners),
/* harmony export */   "setEditTaskListener": () => (/* binding */ setEditTaskListener),
/* harmony export */   "setProjectTabListener": () => (/* binding */ setProjectTabListener)
/* harmony export */ });
/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ "./src/UI/Render.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logic */ "./src/logic.js");





const setDefaultEventListeners = () => {

    document.querySelector(".aside-home").addEventListener("click",_Render__WEBPACK_IMPORTED_MODULE_0__.renderHomeTab);
    // document.querySelector(".today").addEventListener("click",displayTodayTab);
    // document.querySelector(".week").addEventListener("click",displayWeekTab);
    document.querySelector(".aside-priority").addEventListener("click",_Render__WEBPACK_IMPORTED_MODULE_0__.renderPriorityTab);

    setAddTaskModalListeners();
    setProjectModalListeners();
    setEditTaskModalListeners();
}


const setAddTaskModalListeners = () => {

    // DOM elements
    const closeModalBtn = document.querySelector(".task-modal-close-btn");
    const modalOverlay = document.querySelector(".addTask-modal-overlay");
    const submitTaskBtn = document.querySelector(".addTask-modal-btn");

    // Event Listeners
    setAddTaskBtnEventListener();

    closeModalBtn.addEventListener("click", () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addTask-modal-overlay");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addTask-form");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".addTask-error-msg");
    });
    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addTask-form");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addTask-modal-overlay");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".addTask-error-msg");
        }
    })
    submitTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let task = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.getFormData)("addTask-form");
        if ((0,_logic__WEBPACK_IMPORTED_MODULE_1__.formValidation)(task[0])) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderTask)((0,_logic__WEBPACK_IMPORTED_MODULE_1__.createTask)(task[0],task[1],task[2],task[4],task[3]));
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addTask-form");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addTask-modal-overlay");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".addTask-error-msg"); 
        } else {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderErrorMsg)(".addTask-error-msg","*Complete the title field");
        }
    })
};


const setEditTaskModalListeners = () => {

    // DOM elements
    const closeModalBtn = document.querySelector(".editTask-modal-close");
    const modalOverlay = document.querySelector(".taskInfo-modal-overlay");
    const submitTaskBtn = document.querySelector(".editTask-modal-btn");
    const deleteTaskBtn = document.querySelector(".delete-task");

    // Event Listeners
    closeModalBtn.addEventListener("click", () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".taskInfo-modal-overlay");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("taskInfo-form");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".editTask-error-msg");
    });

    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".taskInfo-modal-overlay");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("taskInfo-form");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".editTask-error-msg");
        }
    });

    submitTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById("edit-task-input-title").textContent;
        let arrayTask = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.getFormData)("taskInfo-form");
        let task = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createTask)(taskTitle,arrayTask[1],arrayTask[2],arrayTask[4],arrayTask[3]);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.removeTaskFromScreen)(taskTitle);
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.deleteTaskFromStorage)(taskTitle);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderTask)(task);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".taskInfo-modal-overlay");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("taskInfo-form");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".editTask-error-msg");
    });

    deleteTaskBtn.addEventListener("click", (e) => {
        const title = document.getElementById("edit-task-input-title");
        let formData = new FormData(document.getElementById("taskInfo-form"));

        e.preventDefault();
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.deleteTaskFromStorage)(title.textContent);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.removeTaskFromScreen)(title.textContent);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".taskInfo-modal-overlay");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("taskInfo-form");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".editTask-error-msg");
    })
};

const setProjectModalListeners = () => {

    // DOM Elements
    const addProjectBtn = document.querySelector(".add-project-btn");
    const closeModalBtn = document.querySelector(".project-modal-close-btn");
    const modalOverlay = document.querySelector(".addProject-modal-overlay");
    const submitBtn = document.querySelector(".project-modal-submit");

    // Event Listeners
    addProjectBtn.addEventListener("click", () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.openModal)(".addProject-modal-overlay")
    });

    closeModalBtn.addEventListener("click", () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addProject-modal-overlay");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addProject-form");
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".project-error-msg");
    });
    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addProject-modal-overlay");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addProject-form");
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".project-error-msg");
        }
    });
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let projectName = document.getElementById("project-name").value;

        if ((0,_logic__WEBPACK_IMPORTED_MODULE_1__.formValidation)(projectName)){
            let project = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createProject)(projectName);
            if (project){
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderProject)(project);
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".addProject-modal-overlay");
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)("addProject-form");
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)(".project-error-msg");
            } else {
                displayErrorMsg(".project-error-msg","*This project has already been used");
            }
        } else {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderErrorMsg)(".project-error-msg","*Complete the field with two or more words");
        }
    })
};


const setAddTaskBtnEventListener = () => document.querySelector(".add-task").addEventListener("click", () => {
    (0,_Render__WEBPACK_IMPORTED_MODULE_0__.openModal)(".addTask-modal-overlay");
});

const setProjectTabListener = (id) => {
    document.getElementById(id).addEventListener("click", (e) => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderProjectTasks)(e);
    })
}

const setEditTaskListener = (id) => {
    document.getElementById(id).addEventListener("click", (e) => {
        const title = e.target.parentElement.parentElement.firstChild.children[1].textContent;
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderEditTaskModal)(title);
    })
}




/***/ }),

/***/ "./src/UI/Render.js":
/*!**************************!*\
  !*** ./src/UI/Render.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearErrorMsg": () => (/* binding */ clearErrorMsg),
/* harmony export */   "clearForm": () => (/* binding */ clearForm),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "removeTaskFromScreen": () => (/* binding */ removeTaskFromScreen),
/* harmony export */   "renderEditTaskModal": () => (/* binding */ renderEditTaskModal),
/* harmony export */   "renderErrorMsg": () => (/* binding */ renderErrorMsg),
/* harmony export */   "renderHomeTab": () => (/* binding */ renderHomeTab),
/* harmony export */   "renderPriorityTab": () => (/* binding */ renderPriorityTab),
/* harmony export */   "renderProject": () => (/* binding */ renderProject),
/* harmony export */   "renderProjectTasks": () => (/* binding */ renderProjectTasks),
/* harmony export */   "renderTask": () => (/* binding */ renderTask),
/* harmony export */   "updateModalSelectors": () => (/* binding */ updateModalSelectors)
/* harmony export */ });
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic */ "./src/logic.js");
/* harmony import */ var _EventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventListeners */ "./src/UI/EventListeners.js");



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
    (0,_EventListeners__WEBPACK_IMPORTED_MODULE_1__.setEditTaskListener)(editId);
}

const renderProject = (project) => {
    let tabProject = document.createElement("div");
    let id = project.getName().split(" ").join("-");

    tabProject.classList.add("tab-project");
    tabProject.innerHTML = 
    `<i class="fa-solid fa-circle"></i>
    <div id="${id}">${project.getName()}</div>`;
    projectsContainer.appendChild(tabProject);

    (0,_EventListeners__WEBPACK_IMPORTED_MODULE_1__.setProjectTabListener)(id);
}


const renderHomeTab = () => {
    mainTitle.textContent = "Home";
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayTasksInStorage)();
}

const renderProjectTasks = (e) => {
    mainTitle.textContent = e.target.textContent;
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayTasksOfProjects)(e.target.textContent);
}

const renderPriorityTab = () => {
    mainTitle.textContent = "Priority";
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayPriorityTasks)();
}

const renderEditTaskModal = (name) => {
    let task = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.getTaskByName)(name);
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
    (0,_EventListeners__WEBPACK_IMPORTED_MODULE_1__.setAddTaskBtnEventListener)();
}

const removeTaskFromScreen = (name) => {
    let id = name.split(" ").join("/");
    document.getElementById(id).remove()
}

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




/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDefaultContent": () => (/* binding */ createDefaultContent),
/* harmony export */   "createProject": () => (/* binding */ createProject),
/* harmony export */   "createTask": () => (/* binding */ createTask),
/* harmony export */   "deleteTaskFromStorage": () => (/* binding */ deleteTaskFromStorage),
/* harmony export */   "displayContentInStorage": () => (/* binding */ displayContentInStorage),
/* harmony export */   "displayPriorityTasks": () => (/* binding */ displayPriorityTasks),
/* harmony export */   "displayTasksInStorage": () => (/* binding */ displayTasksInStorage),
/* harmony export */   "displayTasksOfProjects": () => (/* binding */ displayTasksOfProjects),
/* harmony export */   "formValidation": () => (/* binding */ formValidation),
/* harmony export */   "getFormData": () => (/* binding */ getFormData),
/* harmony export */   "getTaskByName": () => (/* binding */ getTaskByName)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/Task.js");
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _UI_Render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI/Render */ "./src/UI/Render.js");
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage */ "./src/Storage.js");








const createTask = (title,description,date,priority,project) => {
    let task = new _Task__WEBPACK_IMPORTED_MODULE_0__["default"](title,description,date,priority,project); 
    (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.setTaskInStorage)(task);
    return task
}

const createProject = (name) => {
    let project = new _Project__WEBPACK_IMPORTED_MODULE_1__["default"](name);
    if ((0,_Storage__WEBPACK_IMPORTED_MODULE_3__.setProjectInStorage)(project)){
        (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.updateModalSelectors)(name);
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
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    todoList.getProjects().forEach(project => {
        (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.renderProject)(project);
        (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.updateModalSelectors)(project.getName());
    });
    removeDefaultProjectFromScreen();
    
}

const displayTasksInStorage = () => {
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    todoList.getProjects().forEach(project => project.getTasks().forEach(task => (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.renderTask)(task)));
}

const displayTasksOfProjects = (projectName) => {
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    let projectToDisplay = todoList.getProjects().find(project => project.getName() == projectName);
    projectToDisplay.getTasks().forEach(task => (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.renderTask)(task));
}

const displayPriorityTasks = () => {
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    let taskToDisplay = todoList.getProjects().forEach(project => project.getTasks().forEach(task => {
        if (task.getPriority() === "on"){
            (0,_UI_Render__WEBPACK_IMPORTED_MODULE_2__.renderTask)(task);
        }
    }))
};

const getTaskByName = (name) => {
    let returnTask;
    (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)().getProjects().forEach(project => project.getTasks().forEach(task => {
        if (task.getName() === name){
            returnTask = task
        }
    }))
    return returnTask;
}

const getProjectOfTask = (taskName) => {
    let projectName;
    (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)().getProjects().forEach(project => {
        if (project.getTask(taskName)){
            projectName = project.getName();
        }
    })
    return projectName
}

const deleteTaskFromStorage = (taskName) => {
    let projectName = getProjectOfTask(taskName);
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    let project = todoList.getProjects().find(project => project.getName() === projectName);
    project.removeTask(taskName);
    (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.setLocalStorage)(todoList);
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



 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_EventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/EventListeners */ "./src/UI/EventListeners.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ "./src/logic.js");





window.addEventListener("DOMContentLoaded", () => {
    //localStorage.clear();
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createDefaultContent)();
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.displayContentInStorage)();
    (0,_UI_EventListeners__WEBPACK_IMPORTED_MODULE_0__.setDefaultEventListeners)();
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFnRCxzREFBVTtBQUMxRDs7QUFFQTtBQUNBLG1CQUFtQix5REFBZTtBQUNsQztBQUNBO0FBQ0EsWUFBWSxzREFBVTtBQUN0QjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx5REFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx5REFBZTtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUFlO0FBQ2xDO0FBQ0E7QUFDQSxJQUFJLHlEQUFlO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7O0FBSStNOzs7Ozs7VUN0SC9NO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTitEO0FBQ087Ozs7QUFJdEU7QUFDQTtBQUNBLElBQUksNERBQW9CO0FBQ3hCLElBQUksK0RBQXVCO0FBQzNCLElBQUksNEVBQXdCO0FBQzVCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvUHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJL0V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9VSS9SZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yIChuYW1lKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxuICAgIHNldE5hbWUobmFtZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB9XG4gICAgc2V0VGFza3ModGFza3MpIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzXG4gICAgfVxuICAgIGFkZFRhc2sobmV3VGFzayl7XG4gICAgICAgIGlmICh0aGlzLnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmdldE5hbWUoKSA9PSBuZXdUYXNrLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIH1cbiAgICBnZXRUYXNrcygpe1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrc1xuICAgIH1cbiAgICBnZXRUYXNrKG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5nZXROYW1lKCkgPT09IG5hbWUpO1xuICAgIH1cbiAgICByZW1vdmVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZ2V0TmFtZSgpICE9PSB0YXNrTmFtZSlcbiAgICB9XG59IiwiaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xuaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xuaW1wb3J0IFRvZG9MaXN0IGZyb20gXCIuL1RvZG9MaXN0XCI7XG5cblxuY29uc3Qgc2V0TG9jYWxTdG9yYWdlID0gKHRvZG9MaXN0KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvTGlzdFwiLEpTT04uc3RyaW5naWZ5KHRvZG9MaXN0KSk7XG59XG5cbmNvbnN0IGdldExvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgICAvLyBGaXJzdCwgd2UgZ2V0IHRoZSB0b2RvTGlzdCBmcm9tIHN0b3JhZ2UgYW5kIGFzc2lnbiB0aGUgbWV0aG9kc1xuICAgIGxldCB0b2RvTGlzdCA9IE9iamVjdC5hc3NpZ24obmV3IFRvZG9MaXN0KCksSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9MaXN0XCIpKSk7XG5cbiAgICAvLyBUaGVuLCBnZXQgdGhlIHByb2plY3RzLCBhc3NpZ24gdGhlIG1ldGhvZHMgd2l0aCBtYXAoKSBhbmQgc2V0IHByb2plY3RzIHdpdGggbWV0aG9kcyBpbiB0aGUgYXJyYXlcbiAgICB0b2RvTGlzdC5zZXRQcm9qZWN0cyh0b2RvTGlzdC5nZXRQcm9qZWN0cygpLm1hcChwcm9qZWN0ID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSxwcm9qZWN0KSkpO1xuXG4gICAgLy8gRmluYWxseSwgZm9yIGVhY2ggcHJvamVjdCwgZ2V0IHRoZSB0YXNrcywgYXNzaWduIG1ldGhvZHMgYW5kIHNldCB0aGVtIGluIHRoZSBhcnJheVxuICAgIHRvZG9MaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3Quc2V0VGFza3MocHJvamVjdC5nZXRUYXNrcygpLm1hcCh0YXNrID0+IE9iamVjdC5hc3NpZ24obmV3IFRhc2soKSx0YXNrKSkpKTtcblxuICAgIHJldHVybiB0b2RvTGlzdDtcbn1cblxuY29uc3Qgc2V0UHJvamVjdEluU3RvcmFnZSA9IChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgaWYgKHRvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCkpe1xuICAgICAgICBzZXRMb2NhbFN0b3JhZ2UodG9kb0xpc3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gcmV0dXJuIGZhbHNlXG4gICAgXG59XG5cbmNvbnN0IHNldFRhc2tJblN0b3JhZ2UgPSAodGFzaykgPT4ge1xuICAgIGxldCB0b2RvTGlzdCA9IGdldExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwcm9qZWN0T2ZUYXNrID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKS5maW5kKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT0gdGFzay5nZXRQcm9qZWN0KCkpO1xuICAgIHByb2plY3RPZlRhc2suYWRkVGFzayh0YXNrKTtcbiAgICBzZXRMb2NhbFN0b3JhZ2UodG9kb0xpc3QpO1xufSAgIFxuXG5cbmV4cG9ydCB7c2V0TG9jYWxTdG9yYWdlLGdldExvY2FsU3RvcmFnZSxzZXRQcm9qZWN0SW5TdG9yYWdlLHNldFRhc2tJblN0b3JhZ2V9IiwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yIChuYW1lLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHkscHJvamVjdCl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGVcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IChwcmlvcml0eSA9PT0gXCJvblwiKSA/IFwib25cIiA6IFwib2ZmXCI7XG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxuICAgIHNldE5hbWUobmFtZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB9XG4gICAgc2V0RGVzY3JpcHRpb24oZGVzYyl7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjXG4gICAgfVxuICAgIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uXG4gICAgfVxuICAgIHNldER1ZURhdGUoZGF0ZSl7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGRhdGVcbiAgICB9XG4gICAgZ2V0RHVlRGF0ZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICAgIH1cbiAgICBzZXRQcmlvcml0eShwcmlvcml0eSl7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSB0aGlzLnByaW9yaXR5ID0gKHByaW9yaXR5ID09PSBcIm9uXCIpID8gXCJvblwiIDogXCJvZmZcIjtcbiAgICB9XG4gICAgZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHlcbiAgICB9XG4gICAgc2V0UHJvamVjdChwcm9qZWN0KXtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdFxuICAgIH1cbiAgICBnZXRQcm9qZWN0KCl7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RcbiAgICB9XG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9MaXN0IHtcbiAgICBjb25zdHJ1Y3RvciAoKXtcbiAgICAgICAgdGhpcy5wcm9qZWN0cyA9IFtdO1xuICAgIH1cblxuICAgIGdldFByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0cztcbiAgICB9XG4gICAgc2V0UHJvamVjdHMocHJvamVjdHMpe1xuICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHNcbiAgICB9XG4gICAgYWRkUHJvamVjdChuZXdQcm9qZWN0KXtcbiAgICAgICAgaWYgKHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QubmFtZSA9PSBuZXdQcm9qZWN0Lm5hbWUpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSl7XG4gICAgICAgIGxldCBwcm9qZWN0VG9EZWxldGUgPSB0aGlzLnByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0Lm5hbWUgPT0gcHJvamVjdE5hbWUpO1xuICAgICAgICB0aGlzLnByb2plY3RzLnNwbGljZSh0aGlzLnByb2plY3RzLmluZGV4T2YocHJvamVjdFRvRGVsZXRlKSwxKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgb3Blbk1vZGFsLCByZW5kZXJIb21lVGFiLHJlbmRlclByaW9yaXR5VGFiLGNsb3NlTW9kYWwsY2xlYXJFcnJvck1zZyxjbGVhckZvcm0scmVuZGVyRWRpdFRhc2tNb2RhbCxyZW5kZXJQcm9qZWN0VGFza3MscmVuZGVyUHJvamVjdCxyZW5kZXJUYXNrLHJlbW92ZVRhc2tGcm9tU2NyZWVuLHJlbmRlckVycm9yTXNnIH0gZnJvbSBcIi4vUmVuZGVyXCI7XG5cbmltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGdldEZvcm1EYXRhLGZvcm1WYWxpZGF0aW9uLCBkZWxldGVUYXNrRnJvbVN0b3JhZ2UsY3JlYXRlVGFzayxnZXRUYXNrQnlOYW1lIH0gZnJvbSBcIi4uL2xvZ2ljXCI7XG5cblxuY29uc3Qgc2V0RGVmYXVsdEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hc2lkZS1ob21lXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHJlbmRlckhvbWVUYWIpO1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kYXlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZGlzcGxheVRvZGF5VGFiKTtcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlZWtcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZGlzcGxheVdlZWtUYWIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXNpZGUtcHJpb3JpdHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIscmVuZGVyUHJpb3JpdHlUYWIpO1xuXG4gICAgc2V0QWRkVGFza01vZGFsTGlzdGVuZXJzKCk7XG4gICAgc2V0UHJvamVjdE1vZGFsTGlzdGVuZXJzKCk7XG4gICAgc2V0RWRpdFRhc2tNb2RhbExpc3RlbmVycygpO1xufVxuXG5cbmNvbnN0IHNldEFkZFRhc2tNb2RhbExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgIC8vIERPTSBlbGVtZW50c1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbW9kYWwtY2xvc2UtYnRuXCIpO1xuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkVGFzay1tb2RhbC1vdmVybGF5XCIpO1xuICAgIGNvbnN0IHN1Ym1pdFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZFRhc2stbW9kYWwtYnRuXCIpO1xuXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXG4gICAgc2V0QWRkVGFza0J0bkV2ZW50TGlzdGVuZXIoKTtcblxuICAgIGNsb3NlTW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY2xvc2VNb2RhbChcIi5hZGRUYXNrLW1vZGFsLW92ZXJsYXlcIik7XG4gICAgICAgIGNsZWFyRm9ybShcImFkZFRhc2stZm9ybVwiKTtcbiAgICAgICAgY2xlYXJFcnJvck1zZyhcIi5hZGRUYXNrLWVycm9yLW1zZ1wiKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIGNsZWFyRm9ybShcImFkZFRhc2stZm9ybVwiKTtcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoXCIuYWRkVGFzay1tb2RhbC1vdmVybGF5XCIpO1xuICAgICAgICAgICAgY2xlYXJFcnJvck1zZyhcIi5hZGRUYXNrLWVycm9yLW1zZ1wiKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgc3VibWl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgdGFzayA9IGdldEZvcm1EYXRhKFwiYWRkVGFzay1mb3JtXCIpO1xuICAgICAgICBpZiAoZm9ybVZhbGlkYXRpb24odGFza1swXSkpIHtcbiAgICAgICAgICAgIHJlbmRlclRhc2soY3JlYXRlVGFzayh0YXNrWzBdLHRhc2tbMV0sdGFza1syXSx0YXNrWzRdLHRhc2tbM10pKTtcbiAgICAgICAgICAgIGNsZWFyRm9ybShcImFkZFRhc2stZm9ybVwiKTtcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoXCIuYWRkVGFzay1tb2RhbC1vdmVybGF5XCIpO1xuICAgICAgICAgICAgY2xlYXJFcnJvck1zZyhcIi5hZGRUYXNrLWVycm9yLW1zZ1wiKTsgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJFcnJvck1zZyhcIi5hZGRUYXNrLWVycm9yLW1zZ1wiLFwiKkNvbXBsZXRlIHRoZSB0aXRsZSBmaWVsZFwiKTtcbiAgICAgICAgfVxuICAgIH0pXG59O1xuXG5cbmNvbnN0IHNldEVkaXRUYXNrTW9kYWxMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAvLyBET00gZWxlbWVudHNcbiAgICBjb25zdCBjbG9zZU1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0VGFzay1tb2RhbC1jbG9zZVwiKTtcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXlcIik7XG4gICAgY29uc3Qgc3VibWl0VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdFRhc2stbW9kYWwtYnRuXCIpO1xuICAgIGNvbnN0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlbGV0ZS10YXNrXCIpO1xuXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXG4gICAgY2xvc2VNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjbG9zZU1vZGFsKFwiLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXlcIik7XG4gICAgICAgIGNsZWFyRm9ybShcInRhc2tJbmZvLWZvcm1cIik7XG4gICAgICAgIGNsZWFyRXJyb3JNc2coXCIuZWRpdFRhc2stZXJyb3ItbXNnXCIpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XG4gICAgICAgICAgICBjbG9zZU1vZGFsKFwiLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXlcIik7XG4gICAgICAgICAgICBjbGVhckZvcm0oXCJ0YXNrSW5mby1mb3JtXCIpO1xuICAgICAgICAgICAgY2xlYXJFcnJvck1zZyhcIi5lZGl0VGFzay1lcnJvci1tc2dcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHN1Ym1pdFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdGFzay1pbnB1dC10aXRsZVwiKS50ZXh0Q29udGVudDtcbiAgICAgICAgbGV0IGFycmF5VGFzayA9IGdldEZvcm1EYXRhKFwidGFza0luZm8tZm9ybVwiKTtcbiAgICAgICAgbGV0IHRhc2sgPSBjcmVhdGVUYXNrKHRhc2tUaXRsZSxhcnJheVRhc2tbMV0sYXJyYXlUYXNrWzJdLGFycmF5VGFza1s0XSxhcnJheVRhc2tbM10pO1xuICAgICAgICByZW1vdmVUYXNrRnJvbVNjcmVlbih0YXNrVGl0bGUpO1xuICAgICAgICBkZWxldGVUYXNrRnJvbVN0b3JhZ2UodGFza1RpdGxlKTtcbiAgICAgICAgcmVuZGVyVGFzayh0YXNrKTtcbiAgICAgICAgY2xvc2VNb2RhbChcIi50YXNrSW5mby1tb2RhbC1vdmVybGF5XCIpO1xuICAgICAgICBjbGVhckZvcm0oXCJ0YXNrSW5mby1mb3JtXCIpO1xuICAgICAgICBjbGVhckVycm9yTXNnKFwiLmVkaXRUYXNrLWVycm9yLW1zZ1wiKTtcbiAgICB9KTtcblxuICAgIGRlbGV0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRhc2staW5wdXQtdGl0bGVcIik7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tJbmZvLWZvcm1cIikpO1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZGVsZXRlVGFza0Zyb21TdG9yYWdlKHRpdGxlLnRleHRDb250ZW50KTtcbiAgICAgICAgcmVtb3ZlVGFza0Zyb21TY3JlZW4odGl0bGUudGV4dENvbnRlbnQpO1xuICAgICAgICBjbG9zZU1vZGFsKFwiLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXlcIik7XG4gICAgICAgIGNsZWFyRm9ybShcInRhc2tJbmZvLWZvcm1cIik7XG4gICAgICAgIGNsZWFyRXJyb3JNc2coXCIuZWRpdFRhc2stZXJyb3ItbXNnXCIpO1xuICAgIH0pXG59O1xuXG5jb25zdCBzZXRQcm9qZWN0TW9kYWxMaXN0ZW5lcnMgPSAoKSA9PiB7XG5cbiAgICAvLyBET00gRWxlbWVudHNcbiAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtcHJvamVjdC1idG5cIik7XG4gICAgY29uc3QgY2xvc2VNb2RhbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1tb2RhbC1jbG9zZS1idG5cIik7XG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRQcm9qZWN0LW1vZGFsLW92ZXJsYXlcIik7XG4gICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW1vZGFsLXN1Ym1pdFwiKTtcblxuICAgIC8vIEV2ZW50IExpc3RlbmVyc1xuICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgb3Blbk1vZGFsKFwiLmFkZFByb2plY3QtbW9kYWwtb3ZlcmxheVwiKVxuICAgIH0pO1xuXG4gICAgY2xvc2VNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjbG9zZU1vZGFsKFwiLmFkZFByb2plY3QtbW9kYWwtb3ZlcmxheVwiKTtcbiAgICAgICAgY2xlYXJGb3JtKFwiYWRkUHJvamVjdC1mb3JtXCIpO1xuICAgICAgICBjbGVhckVycm9yTXNnKFwiLnByb2plY3QtZXJyb3ItbXNnXCIpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xuICAgICAgICAgICAgY2xvc2VNb2RhbChcIi5hZGRQcm9qZWN0LW1vZGFsLW92ZXJsYXlcIik7XG4gICAgICAgICAgICBjbGVhckZvcm0oXCJhZGRQcm9qZWN0LWZvcm1cIik7XG4gICAgICAgICAgICBjbGVhckVycm9yTXNnKFwiLnByb2plY3QtZXJyb3ItbXNnXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lXCIpLnZhbHVlO1xuXG4gICAgICAgIGlmIChmb3JtVmFsaWRhdGlvbihwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgbGV0IHByb2plY3QgPSBjcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0KXtcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoXCIuYWRkUHJvamVjdC1tb2RhbC1vdmVybGF5XCIpO1xuICAgICAgICAgICAgICAgIGNsZWFyRm9ybShcImFkZFByb2plY3QtZm9ybVwiKTtcbiAgICAgICAgICAgICAgICBjbGVhckVycm9yTXNnKFwiLnByb2plY3QtZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RXJyb3JNc2coXCIucHJvamVjdC1lcnJvci1tc2dcIixcIipUaGlzIHByb2plY3QgaGFzIGFscmVhZHkgYmVlbiB1c2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyRXJyb3JNc2coXCIucHJvamVjdC1lcnJvci1tc2dcIixcIipDb21wbGV0ZSB0aGUgZmllbGQgd2l0aCB0d28gb3IgbW9yZSB3b3Jkc1wiKTtcbiAgICAgICAgfVxuICAgIH0pXG59O1xuXG5cbmNvbnN0IHNldEFkZFRhc2tCdG5FdmVudExpc3RlbmVyID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG9wZW5Nb2RhbChcIi5hZGRUYXNrLW1vZGFsLW92ZXJsYXlcIik7XG59KTtcblxuY29uc3Qgc2V0UHJvamVjdFRhYkxpc3RlbmVyID0gKGlkKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICByZW5kZXJQcm9qZWN0VGFza3MoZSk7XG4gICAgfSlcbn1cblxuY29uc3Qgc2V0RWRpdFRhc2tMaXN0ZW5lciA9IChpZCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC5jaGlsZHJlblsxXS50ZXh0Q29udGVudDtcbiAgICAgICAgcmVuZGVyRWRpdFRhc2tNb2RhbCh0aXRsZSk7XG4gICAgfSlcbn1cblxuXG5leHBvcnQge3NldERlZmF1bHRFdmVudExpc3RlbmVycyxzZXRBZGRUYXNrQnRuRXZlbnRMaXN0ZW5lcixzZXRQcm9qZWN0VGFiTGlzdGVuZXIsc2V0RWRpdFRhc2tMaXN0ZW5lcn0iLCJpbXBvcnQgeyBkaXNwbGF5UHJpb3JpdHlUYXNrcywgZGlzcGxheVRhc2tzSW5TdG9yYWdlLCBkaXNwbGF5VGFza3NPZlByb2plY3RzLCBnZXRUYXNrQnlOYW1lIH0gZnJvbSBcIi4uL2xvZ2ljXCI7XG5pbXBvcnQgeyBzZXRQcm9qZWN0VGFiTGlzdGVuZXIsIHNldEFkZFRhc2tCdG5FdmVudExpc3RlbmVyLHNldEVkaXRUYXNrTGlzdGVuZXIgfSBmcm9tIFwiLi9FdmVudExpc3RlbmVyc1wiO1xuXG5sZXQgbWFpblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLXRpdGxlXCIpO1xuY29uc3QgdGFza0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb250YWluZXJcIik7XG5jb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuXG5cbmNvbnN0IHJlbmRlclRhc2sgPSAodGFzaykgPT4ge1xuICAgIGxldCBlZGl0SWQgPSB0YXNrLm5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCItXCIpO1xuICAgIGxldCB0YXNrSWQgPSB0YXNrLm5hbWUuc3BsaXQoXCIgXCIpLmpvaW4oXCIvXCIpXG4gICAgbGV0IHByaW9yaXR5SWNvbjtcbiAgICAodGFzay5wcmlvcml0eSA9PT0gXCJvblwiKSA/IHByaW9yaXR5SWNvbiA9IFwiZmEtc29saWQgZmEtc3RhclwiIDogcHJpb3JpdHlJY29uID0gXCJmYS1yZWd1bGFyIGZhLXN0YXJcIjtcbiAgICBcbiAgICBsZXQgbWFpblRhc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG1haW5UYXNrLmNsYXNzTGlzdC5hZGQoXCJtYWluLXRhc2tcIik7XG4gICAgbWFpblRhc2suc2V0QXR0cmlidXRlKFwiaWRcIix0YXNrSWQpO1xuICAgIG1haW5UYXNrLmlubmVySFRNTCA9IFxuICAgIGA8ZGl2PlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cImNoZWNrXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLW5hbWVcIj4ke3Rhc2submFtZX08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1kYXRlXCI+JHt0YXNrLmR1ZURhdGV9PC9kaXY+XG4gICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGVuLXRvLXNxdWFyZVwiIGlkPVwiJHtlZGl0SWR9XCI+PC9pPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJpb3JpdHlcIj48aSBjbGFzcz1cIiR7cHJpb3JpdHlJY29ufVwiPjwvaT48L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgIHRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQobWFpblRhc2spO1xuICAgIG1vdmVBZGRCdXR0b24oKTtcbiAgICBzZXRFZGl0VGFza0xpc3RlbmVyKGVkaXRJZCk7XG59XG5cbmNvbnN0IHJlbmRlclByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgIGxldCB0YWJQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZXQgaWQgPSBwcm9qZWN0LmdldE5hbWUoKS5zcGxpdChcIiBcIikuam9pbihcIi1cIik7XG5cbiAgICB0YWJQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJ0YWItcHJvamVjdFwiKTtcbiAgICB0YWJQcm9qZWN0LmlubmVySFRNTCA9IFxuICAgIGA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZVwiPjwvaT5cbiAgICA8ZGl2IGlkPVwiJHtpZH1cIj4ke3Byb2plY3QuZ2V0TmFtZSgpfTwvZGl2PmA7XG4gICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFiUHJvamVjdCk7XG5cbiAgICBzZXRQcm9qZWN0VGFiTGlzdGVuZXIoaWQpO1xufVxuXG5cbmNvbnN0IHJlbmRlckhvbWVUYWIgPSAoKSA9PiB7XG4gICAgbWFpblRpdGxlLnRleHRDb250ZW50ID0gXCJIb21lXCI7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgZGlzcGxheVRhc2tzSW5TdG9yYWdlKCk7XG59XG5cbmNvbnN0IHJlbmRlclByb2plY3RUYXNrcyA9IChlKSA9PiB7XG4gICAgbWFpblRpdGxlLnRleHRDb250ZW50ID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgZGlzcGxheVRhc2tzT2ZQcm9qZWN0cyhlLnRhcmdldC50ZXh0Q29udGVudCk7XG59XG5cbmNvbnN0IHJlbmRlclByaW9yaXR5VGFiID0gKCkgPT4ge1xuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IFwiUHJpb3JpdHlcIjtcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBkaXNwbGF5UHJpb3JpdHlUYXNrcygpO1xufVxuXG5jb25zdCByZW5kZXJFZGl0VGFza01vZGFsID0gKG5hbWUpID0+IHtcbiAgICBsZXQgdGFzayA9IGdldFRhc2tCeU5hbWUobmFtZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrSW5mby1tb2RhbC10aXRsZVwiKS50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgICBvcGVuTW9kYWwoXCIudGFza0luZm8tbW9kYWwtb3ZlcmxheVwiKTtcbiAgICBzZXRUYXNrRm9ybURhdGEodGFzayk7XG59XG5cbmNvbnN0IHNldFRhc2tGb3JtRGF0YSA9ICh0YXNrKSA9PiB7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRhc2staW5wdXQtdGl0bGVcIik7XG4gICAgbGV0IGlucHV0RGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10YXNrLWlucHV0LWRlc2NcIik7XG4gICAgbGV0IGlucHV0RGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10YXNrLWlucHV0LWRhdGVcIik7XG4gICAgbGV0IGlucHV0UHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdC10YXNrLWlucHV0LXByb2plY3RcIik7XG4gICAgbGV0IGlucHV0UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXQtdGFzay1pbnB1dC1wcmlvcml0eVwiKTtcblxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFzay5nZXROYW1lKCk7XG4gICAgaW5wdXREZXNjLnZhbHVlID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xuICAgIGlucHV0RGF0ZS52YWx1ZSA9IHRhc2suZ2V0RHVlRGF0ZSgpO1xuICAgIGlucHV0UHJvamVjdC52YWx1ZSA9IHRhc2suZ2V0UHJvamVjdCgpO1xuICAgIGlucHV0UHJpb3JpdHkuY2hlY2tlZCA9ICh0YXNrLmdldFByaW9yaXR5KCkgPT09IFwib25cIikgPyB0cnVlIDogZmFsc2U7XG5cbn1cblxuY29uc3QgY2xlYXJUYXNrQ29udGFpbmVyID0gKCkgPT4ge1xuICAgIHRhc2tDb250YWluZXIuaW5uZXJIVE1MID0gXG4gICAgYDxkaXYgY2xhc3M9XCJhZGQtdGFza1wiPlxuICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L2k+XG4gICAgICAgIDxkaXY+QWRkIFRhc2s8L2Rpdj5cbiAgICA8L2Rpdj5gO1xuICAgIHNldEFkZFRhc2tCdG5FdmVudExpc3RlbmVyKCk7XG59XG5cbmNvbnN0IHJlbW92ZVRhc2tGcm9tU2NyZWVuID0gKG5hbWUpID0+IHtcbiAgICBsZXQgaWQgPSBuYW1lLnNwbGl0KFwiIFwiKS5qb2luKFwiL1wiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkucmVtb3ZlKClcbn1cblxuY29uc3QgbW92ZUFkZEJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcbiAgICAoYWRkVGFza0J0bi5uZXh0RWxlbWVudFNpYmxpbmcgIT09IG51bGwpID8gdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChhZGRUYXNrQnRuKSA6IDA7XG59XG5cbmNvbnN0IHJlbmRlckVycm9yTXNnID0gKENsYXNzLG1zZykgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihDbGFzcykudGV4dENvbnRlbnQgPSBtc2c7XG5jb25zdCBjbGVhckVycm9yTXNnID0gKENsYXNzKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENsYXNzKS50ZXh0Q29udGVudCA9IFwiXCI7XG5cbmNvbnN0IG9wZW5Nb2RhbCA9IENsYXNzID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2xhc3MpLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuY29uc3QgY2xvc2VNb2RhbCA9IENsYXNzID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2xhc3MpLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuXG5jb25zdCBjbGVhckZvcm0gPSAoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5yZXNldCgpO1xuXG5jb25zdCB1cGRhdGVNb2RhbFNlbGVjdG9ycyA9ICh2YWx1ZSkgPT4ge1xuICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSB0byBhZGQgaXMgYWxyZWFkeSBhZGRlZCB0byBhdm9pZCByZXBldGl0aW9uc1xuXG4gICAgY29uc3QgYWRkVGFza1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLXRhc2stc2VsZWN0XCIpO1xuICAgIGNvbnN0IGVkaXRUYXNrU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0LXRhc2staW5wdXQtcHJvamVjdFwiKTtcbiAgICBcbiAgICBsZXQgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGFkZFRhc2tTZWxlY3QuY2hpbGRyZW4pO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICBhZGRUYXNrU2VsZWN0LmlubmVySFRNTCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCI+JHt2YWx1ZX08L29wdGlvbj5gO1xuICAgICAgICBlZGl0VGFza1NlbGVjdC5pbm5lckhUTUwgKz0gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiPiR7dmFsdWV9PC9vcHRpb24+YDtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG9rZXkgPSB0cnVlO1xuICAgIGZvciAobGV0IG9wdGlvbiBvZiBjaGlsZHJlbil7XG4gICAgICAgIGlmIChvcHRpb24udGV4dENvbnRlbnQgPT09IHZhbHVlKXtcbiAgICAgICAgICAgIG9rZXkgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9rZXkpIHtcbiAgICAgICAgYWRkVGFza1NlbGVjdC5pbm5lckhUTUwgKz0gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiPiR7dmFsdWV9PC9vcHRpb24+YDtcbiAgICAgICAgZWRpdFRhc2tTZWxlY3QuaW5uZXJIVE1MICs9IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIj4ke3ZhbHVlfTwvb3B0aW9uPmA7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB7cmVuZGVyVGFzayxyZW5kZXJQcm9qZWN0LHVwZGF0ZU1vZGFsU2VsZWN0b3JzLHJlbmRlckhvbWVUYWIscmVuZGVyUHJpb3JpdHlUYWIsY2xvc2VNb2RhbCxvcGVuTW9kYWwsY2xlYXJFcnJvck1zZyxyZW5kZXJFZGl0VGFza01vZGFsLHJlbmRlckVycm9yTXNnLGNsZWFyRm9ybSxyZW5kZXJQcm9qZWN0VGFza3MscmVtb3ZlVGFza0Zyb21TY3JlZW59IiwiaW1wb3J0IFRhc2sgZnJvbSBcIi4vVGFza1wiO1xuaW1wb3J0IFByb2plY3QgZnJvbSBcIi4vUHJvamVjdFwiO1xuaW1wb3J0IHsgcmVuZGVyVGFzayxyZW5kZXJQcm9qZWN0LHVwZGF0ZU1vZGFsU2VsZWN0b3JzIH0gZnJvbSBcIi4vVUkvUmVuZGVyXCI7XG5pbXBvcnQgeyBnZXRMb2NhbFN0b3JhZ2UsIHNldFByb2plY3RJblN0b3JhZ2UsIHNldFRhc2tJblN0b3JhZ2UsIHNldExvY2FsU3RvcmFnZX0gZnJvbSBcIi4vU3RvcmFnZVwiO1xuaW1wb3J0IHsgcmVuZGVyRXJyb3JNc2csY2xlYXJGb3JtIH0gZnJvbSBcIi4vVUkvUmVuZGVyXCI7XG5cblxuXG5jb25zdCBjcmVhdGVUYXNrID0gKHRpdGxlLGRlc2NyaXB0aW9uLGRhdGUscHJpb3JpdHkscHJvamVjdCkgPT4ge1xuICAgIGxldCB0YXNrID0gbmV3IFRhc2sodGl0bGUsZGVzY3JpcHRpb24sZGF0ZSxwcmlvcml0eSxwcm9qZWN0KTsgXG4gICAgc2V0VGFza0luU3RvcmFnZSh0YXNrKTtcbiAgICByZXR1cm4gdGFza1xufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgIGlmIChzZXRQcm9qZWN0SW5TdG9yYWdlKHByb2plY3QpKXtcbiAgICAgICAgdXBkYXRlTW9kYWxTZWxlY3RvcnMobmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0XG4gICAgfSByZXR1cm4gZmFsc2VcbiAgICBcbn1cbiBcblxuY29uc3QgY3JlYXRlRGVmYXVsdENvbnRlbnQgPSAoKSA9PiB7XG5cbiAgICBjcmVhdGVQcm9qZWN0KFwiTm8gUHJvamVjdFwiKTtcbiAgICBjcmVhdGVQcm9qZWN0KFwiREFwcFwiKTtcbiAgICBjcmVhdGVQcm9qZWN0KFwiQ2xlYW4gSG91c2VcIik7XG5cbiAgICBjcmVhdGVUYXNrKFwiRG8gdGhlIHdhc2hpbmcgdXBcIixcIlVzZSB0aGUgYXBwcm9waWF0ZSBkaXNod2FzaGVyXCIsXCIyMDIyLTA0LTI5XCIsXCJvZmZcIixcIkNsZWFuIEhvdXNlXCIpXG4gICAgY3JlYXRlVGFzayhcIkRlYnVnIHRoZSBzbWFydCBjb250cmFjdFwiLFwiXCIsXCIyMDIyLTA1LTAxXCIsXCJvblwiLFwiREFwcFwiKTtcbiAgICBjcmVhdGVUYXNrKFwiVmFjdXVtaW5nIHRoZSBiYXNlbWVudFwiLFwiXCIsXCIyMDIyLTA0LTMwXCIsXCJvZmZcIixcIkNsZWFuIEhvdXNlXCIpO1xuICAgIGNyZWF0ZVRhc2soXCJTaGl0dFwiLFwiXCIsXCIyMDIyLTA3LTAzXCIsXCJvblwiLFwiQ2xlYW4gSG91c2VcIilcblxufVxuXG5jb25zdCByZW1vdmVEZWZhdWx0UHJvamVjdEZyb21TY3JlZW4gPSAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzLWNvbnRhaW5lclwiKS5maXJzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKTtcblxuY29uc3QgZGlzcGxheUNvbnRlbnRJblN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgZGlzcGxheVByb2plY3RzSW5TdG9yYWdlKCk7XG4gICAgZGlzcGxheVRhc2tzSW5TdG9yYWdlKCk7XG59XG5cbmNvbnN0IGRpc3BsYXlQcm9qZWN0c0luU3RvcmFnZSA9ICgpID0+IHtcbiAgICBsZXQgdG9kb0xpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIHJlbmRlclByb2plY3QocHJvamVjdCk7XG4gICAgICAgIHVwZGF0ZU1vZGFsU2VsZWN0b3JzKHByb2plY3QuZ2V0TmFtZSgpKTtcbiAgICB9KTtcbiAgICByZW1vdmVEZWZhdWx0UHJvamVjdEZyb21TY3JlZW4oKTtcbiAgICBcbn1cblxuY29uc3QgZGlzcGxheVRhc2tzSW5TdG9yYWdlID0gKCkgPT4ge1xuICAgIGxldCB0b2RvTGlzdCA9IGdldExvY2FsU3RvcmFnZSgpO1xuICAgIHRvZG9MaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKHRhc2sgPT4gcmVuZGVyVGFzayh0YXNrKSkpO1xufVxuXG5jb25zdCBkaXNwbGF5VGFza3NPZlByb2plY3RzID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgbGV0IHByb2plY3RUb0Rpc3BsYXkgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PSBwcm9qZWN0TmFtZSk7XG4gICAgcHJvamVjdFRvRGlzcGxheS5nZXRUYXNrcygpLmZvckVhY2godGFzayA9PiByZW5kZXJUYXNrKHRhc2spKTtcbn1cblxuY29uc3QgZGlzcGxheVByaW9yaXR5VGFza3MgPSAoKSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgbGV0IHRhc2tUb0Rpc3BsYXkgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZvckVhY2gocHJvamVjdCA9PiBwcm9qZWN0LmdldFRhc2tzKCkuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgaWYgKHRhc2suZ2V0UHJpb3JpdHkoKSA9PT0gXCJvblwiKXtcbiAgICAgICAgICAgIHJlbmRlclRhc2sodGFzayk7XG4gICAgICAgIH1cbiAgICB9KSlcbn07XG5cbmNvbnN0IGdldFRhc2tCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgIGxldCByZXR1cm5UYXNrO1xuICAgIGdldExvY2FsU3RvcmFnZSgpLmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAodGFzay5nZXROYW1lKCkgPT09IG5hbWUpe1xuICAgICAgICAgICAgcmV0dXJuVGFzayA9IHRhc2tcbiAgICAgICAgfVxuICAgIH0pKVxuICAgIHJldHVybiByZXR1cm5UYXNrO1xufVxuXG5jb25zdCBnZXRQcm9qZWN0T2ZUYXNrID0gKHRhc2tOYW1lKSA9PiB7XG4gICAgbGV0IHByb2plY3ROYW1lO1xuICAgIGdldExvY2FsU3RvcmFnZSgpLmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgaWYgKHByb2plY3QuZ2V0VGFzayh0YXNrTmFtZSkpe1xuICAgICAgICAgICAgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHByb2plY3ROYW1lXG59XG5cbmNvbnN0IGRlbGV0ZVRhc2tGcm9tU3RvcmFnZSA9ICh0YXNrTmFtZSkgPT4ge1xuICAgIGxldCBwcm9qZWN0TmFtZSA9IGdldFByb2plY3RPZlRhc2sodGFza05hbWUpO1xuICAgIGxldCB0b2RvTGlzdCA9IGdldExvY2FsU3RvcmFnZSgpO1xuICAgIGxldCBwcm9qZWN0ID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKS5maW5kKHByb2plY3QgPT4gcHJvamVjdC5nZXROYW1lKCkgPT09IHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0LnJlbW92ZVRhc2sodGFza05hbWUpO1xuICAgIHNldExvY2FsU3RvcmFnZSh0b2RvTGlzdCk7XG59XG5cblxuY29uc3QgZ2V0Rm9ybURhdGEgPSAoaWQpID0+IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpO1xuICAgIGxldCB0aXRsZSA9IGZvcm1EYXRhLmdldChcInRpdGxlXCIpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGZvcm1EYXRhLmdldChcImRlc2NyaXB0aW9uXCIpO1xuICAgIGxldCBkYXRlID0gZm9ybURhdGEuZ2V0KFwiZGF0ZVwiKTtcbiAgICBsZXQgcHJvamVjdCA9IGZvcm1EYXRhLmdldChcInByb2plY3RcIik7XG4gICAgbGV0IHByaW9yaXR5ID0gZm9ybURhdGEuZ2V0KFwicHJpb3JpdHlcIik7XG5cbiAgICByZXR1cm4gW3RpdGxlLGRlc2NyaXB0aW9uLGRhdGUscHJvamVjdCxwcmlvcml0eV07XG59XG5cbmNvbnN0IGZvcm1WYWxpZGF0aW9uID0gKHRpdGxlKSA9PiAodGl0bGUubGVuZ3RoIDwgMikgPyBmYWxzZSA6IHRydWU7XG5cblxuXG5leHBvcnQge2NyZWF0ZURlZmF1bHRDb250ZW50LGRpc3BsYXlDb250ZW50SW5TdG9yYWdlLGRpc3BsYXlUYXNrc0luU3RvcmFnZSxkaXNwbGF5VGFza3NPZlByb2plY3RzLGRpc3BsYXlQcmlvcml0eVRhc2tzLGNyZWF0ZVRhc2ssY3JlYXRlUHJvamVjdCxnZXRGb3JtRGF0YSxmb3JtVmFsaWRhdGlvbixnZXRUYXNrQnlOYW1lLGRlbGV0ZVRhc2tGcm9tU3RvcmFnZX0gIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBzZXREZWZhdWx0RXZlbnRMaXN0ZW5lcnMgfSBmcm9tIFwiLi9VSS9FdmVudExpc3RlbmVyc1wiO1xuaW1wb3J0IHtjcmVhdGVEZWZhdWx0Q29udGVudCwgZGlzcGxheUNvbnRlbnRJblN0b3JhZ2V9IGZyb20gXCIuL2xvZ2ljXCI7XG5cblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIC8vbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgY3JlYXRlRGVmYXVsdENvbnRlbnQoKTtcbiAgICBkaXNwbGF5Q29udGVudEluU3RvcmFnZSgpO1xuICAgIHNldERlZmF1bHRFdmVudExpc3RlbmVycygpO1xufSlcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9