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
    localStorage.setItem('todoList',JSON.stringify(todoList));
}

const getLocalStorage = () => {
    // First, we get the todoList from storage and assign the methods
    let todoList = Object.assign(new _TodoList__WEBPACK_IMPORTED_MODULE_2__["default"](),JSON.parse(localStorage.getItem('todoList')));

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
        this.priority = (priority === 'on') ? 'on' : 'off';
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
        this.priority = this.priority = (priority === 'on') ? 'on' : 'off';
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
/* harmony export */   "setProjectTabListeners": () => (/* binding */ setProjectTabListeners)
/* harmony export */ });
/* harmony import */ var _Render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Render */ "./src/UI/Render.js");
/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../logic */ "./src/logic.js");





const setDefaultEventListeners = () => {

    document.querySelector('.aside-home').addEventListener('click',_Render__WEBPACK_IMPORTED_MODULE_0__.renderHomeTab);
    // document.querySelector('.today').addEventListener('click',displayTodayTab);
    // document.querySelector('.week').addEventListener('click',displayWeekTab);
    document.querySelector('.aside-priority').addEventListener('click',_Render__WEBPACK_IMPORTED_MODULE_0__.renderPriorityTab);

    setAddTaskModalListeners();
    setProjectModalListeners();
    setEditTaskModalListeners();
}


const setAddTaskModalListeners = () => {

    // DOM elements
    const closeModalBtn = document.querySelector('.task-modal-close-btn');
    const modalOverlay = document.querySelector('.addTask-modal-overlay');
    const submitTaskBtn = document.querySelector('.addTask-modal-btn');

    // Event Listeners
    setAddTaskBtnEventListener();

    closeModalBtn.addEventListener('click', () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addTask-modal-overlay');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addTask-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.addTask-error-msg');
    });
    document.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addTask-form');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addTask-modal-overlay');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.addTask-error-msg');
        }
    })
    submitTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let task = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.getFormData)('addTask-form');
        if ((0,_logic__WEBPACK_IMPORTED_MODULE_1__.formValidation)(task[0])) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderTask)((0,_logic__WEBPACK_IMPORTED_MODULE_1__.createTask)(task[0],task[1],task[2],task[4],task[3]));
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addTask-form');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addTask-modal-overlay');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.addTask-error-msg'); 
        } else {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderErrorMsg)('.addTask-error-msg','*Complete the title field');
        }
    })
};


const setEditTaskModalListeners = () => {

    // DOM elements
    const closeModalBtn = document.querySelector('.editTask-modal-close');
    const modalOverlay = document.querySelector('.taskInfo-modal-overlay');
    const submitTaskBtn = document.querySelector('.editTask-modal-btn');
    const deleteTaskBtn = document.querySelector('.delete-task');

    // Event Listeners
    closeModalBtn.addEventListener('click', () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.taskInfo-modal-overlay');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('taskInfo-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.editTask-error-msg');
    });

    document.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.taskInfo-modal-overlay');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('taskInfo-form');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.editTask-error-msg');
        }
    });

    submitTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById('edit-task-input-title').textContent;
        let arrayTask = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.getFormData)('taskInfo-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.removeTaskFromScreen)(taskTitle);
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.deleteTaskFromStorage)(taskTitle);

        let task = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createTask)(taskTitle,arrayTask[1],arrayTask[2],arrayTask[4],arrayTask[3]);      
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderTask)(task);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.taskInfo-modal-overlay');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('taskInfo-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.editTask-error-msg');
    });

    deleteTaskBtn.addEventListener('click', (e) => {
        const title = document.getElementById('edit-task-input-title');
        let formData = new FormData(document.getElementById('taskInfo-form'));

        e.preventDefault();
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.deleteTaskFromStorage)(title.textContent);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.removeTaskFromScreen)(title.textContent);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.taskInfo-modal-overlay');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('taskInfo-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.editTask-error-msg');
    })
};

const setProjectModalListeners = () => {

    // DOM Elements
    const addProjectBtn = document.querySelector('.add-project-btn');
    const closeModalBtn = document.querySelector('.project-modal-close-btn');
    const modalOverlay = document.querySelector('.addProject-modal-overlay');
    const submitBtn = document.querySelector('.project-modal-submit');

    // Event Listeners
    addProjectBtn.addEventListener('click', () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.openModal)('.addProject-modal-overlay')
    });

    closeModalBtn.addEventListener('click', () => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addProject-modal-overlay');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addProject-form');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.project-error-msg');
    });
    document.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addProject-modal-overlay');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addProject-form');
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.project-error-msg');
        }
    });
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let projectName = document.getElementById('project-name').value;

        if ((0,_logic__WEBPACK_IMPORTED_MODULE_1__.formValidation)(projectName)){
            let project = (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createProject)(projectName);
            if (project){
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderProject)(project);
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.addProject-modal-overlay');
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearForm)('addProject-form');
                (0,_Render__WEBPACK_IMPORTED_MODULE_0__.clearErrorMsg)('.project-error-msg');
            } else {
                displayErrorMsg('.project-error-msg','*This project has already been used');
            }
        } else {
            (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderErrorMsg)('.project-error-msg','*Complete the field with two or more words');
        }
    })
};


const setAddTaskBtnEventListener = () => document.querySelector('.add-task').addEventListener('click', () => {
    (0,_Render__WEBPACK_IMPORTED_MODULE_0__.openModal)('.addTask-modal-overlay');
});

const setProjectTabListeners = (id) => {
    let projectTab = document.getElementById(id);
    projectTab.children[1].addEventListener('click', (e) => {
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderProjectTasks)(e);
    });
    projectTab.addEventListener('mouseover', (e) => {
        projectTab.children[2].classList.remove('hidden');
    })
    projectTab.addEventListener('mouseout', (e) => {
        projectTab.children[2].classList.add('hidden')
    });
    projectTab.children[2].addEventListener('click', (e) => {
        const projectName = id.split('-').join(' ');
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.removeProjectFromScreen)(id);
        (0,_logic__WEBPACK_IMPORTED_MODULE_1__.deleteProjectFromStorage)(projectName);
        (0,_Render__WEBPACK_IMPORTED_MODULE_0__.renderHomeTab)();

    })
}

const setEditTaskListener = (id) => {
    document.getElementById(id).addEventListener('click', (e) => {
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
/* harmony export */   "removeProjectFromScreen": () => (/* binding */ removeProjectFromScreen),
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



let mainTitle = document.querySelector('.main-title');
const taskContainer = document.querySelector('.task-container');
const projectsContainer = document.querySelector('.projects-container');


const renderTask = (task) => {
    let editId = task.name.split(' ').join('-');
    let taskId = task.name.split(' ').join('/')
    let priorityIcon;
    (task.priority === 'on') ? priorityIcon = 'fa-solid fa-star' : priorityIcon = 'fa-regular fa-star';
    
    let mainTask = document.createElement('div');
    mainTask.classList.add('main-task');
    mainTask.setAttribute('id',taskId);
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
    let tabProject = document.createElement('div');
    let id = project.getName().split(' ').join('-');

    tabProject.classList.add('tab-project');
    tabProject.setAttribute('id',id)
    tabProject.innerHTML = 
    `<i class="fa-solid fa-circle"></i>
    <div>${project.getName()}</div>
    <i class="fa-solid fa-xmark hidden"></i>`;
    projectsContainer.appendChild(tabProject);

    (0,_EventListeners__WEBPACK_IMPORTED_MODULE_1__.setProjectTabListeners)(id);
}


const renderHomeTab = () => {
    mainTitle.textContent = 'Home';
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayTasksInStorage)();
}

const renderProjectTasks = (e) => {
    let projectTitle = e.target.textContent;
    mainTitle.textContent = projectTitle
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayTasksOfProjects)(projectTitle);
}

const renderPriorityTab = () => {
    mainTitle.textContent = 'Priority';
    clearTaskContainer();
    (0,_logic__WEBPACK_IMPORTED_MODULE_0__.displayPriorityTasks)();
}

const renderEditTaskModal = (name) => {
    let task = (0,_logic__WEBPACK_IMPORTED_MODULE_0__.getTaskByName)(name);
    document.querySelector('.taskInfo-modal-title').textContent = name;

    openModal('.taskInfo-modal-overlay');
    setTaskFormData(task);
}

const setTaskFormData = (task) => {
    let title = document.getElementById('edit-task-input-title');
    let inputDesc = document.getElementById('edit-task-input-desc');
    let inputDate = document.getElementById('edit-task-input-date');
    let inputProject = document.getElementById('edit-task-input-project');
    let inputPriority = document.getElementById('edit-task-input-priority');

    title.textContent = task.getName();
    inputDesc.value = task.getDescription();
    inputDate.value = task.getDueDate();
    inputProject.value = task.getProject();
    inputPriority.checked = (task.getPriority() === 'on') ? true : false;

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
    let id = name.split(' ').join('/');
    document.getElementById(id).remove();
};

const removeProjectFromScreen = (id) => document.getElementById(id).remove();


const moveAddButton = () => {
    const addTaskBtn = document.querySelector(".add-task");
    (addTaskBtn.nextElementSibling !== null) ? taskContainer.appendChild(addTaskBtn) : 0;
}

const renderErrorMsg = (Class,msg) => document.querySelector(Class).textContent = msg;
const clearErrorMsg = (Class) => document.querySelector(Class).textContent = '';

const openModal = Class => document.querySelector(Class).classList.add('show');
const closeModal = Class => document.querySelector(Class).classList.remove('show');

const clearForm = (id) => document.getElementById(id).reset();

const updateModalSelectors = (value) => {
    // Check if the value to add is already added to avoid repetitions

    const addTaskSelect = document.getElementById('add-task-select');
    const editTaskSelect = document.getElementById('edit-task-input-project');
    
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
/* harmony export */   "deleteProjectFromStorage": () => (/* binding */ deleteProjectFromStorage),
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

    createProject('No Project');
    createProject('DApp');
    createProject('Clean House');

    createTask('Do the washing up','Use the appropiate dishwasher','2022-04-29','off','Clean House');
    createTask('Debug the smart contract','','2022-05-01','on','DApp');
    createTask('Vacuuming the basement','','2022-04-30','off','Clean House');
}

const removeDefaultProjectFromScreen = () => document.querySelector('.projects-container').firstElementChild.remove();

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

const deleteProjectFromStorage = (projectName) => {
    let todoList = (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.getLocalStorage)();
    todoList.deleteProject(projectName);
    (0,_Storage__WEBPACK_IMPORTED_MODULE_3__.setLocalStorage)(todoList);
}


const getFormData = (id) => {
    const formData = new FormData(document.getElementById(id));
    let title = formData.get('title');
    let description = formData.get('description');
    let date = formData.get('date');
    let project = formData.get('project');
    let priority = formData.get('priority');

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





window.addEventListener('DOMContentLoaded', () => {
    //localStorage.clear();
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.createDefaultContent)();
    (0,_logic__WEBPACK_IMPORTED_MODULE_1__.displayContentInStorage)();
    (0,_UI_EventListeners__WEBPACK_IMPORTED_MODULE_0__.setDefaultEventListeners)();
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvVG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL1VJL0V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9VSS9SZW5kZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2xvZ2ljLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yIChuYW1lKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLnRhc2tzID0gW107XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lXG4gICAgfVxuICAgIHNldE5hbWUobmFtZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB9XG4gICAgc2V0VGFza3ModGFza3MpIHtcbiAgICAgICAgdGhpcy50YXNrcyA9IHRhc2tzXG4gICAgfVxuICAgIGFkZFRhc2sobmV3VGFzayl7XG4gICAgICAgIGlmICh0aGlzLnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmdldE5hbWUoKSA9PSBuZXdUYXNrLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIH1cbiAgICBnZXRUYXNrcygpe1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrc1xuICAgIH1cbiAgICBnZXRUYXNrKG5hbWUpe1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrcy5maW5kKHRhc2sgPT4gdGFzay5nZXROYW1lKCkgPT09IG5hbWUpO1xuICAgIH1cbiAgICByZW1vdmVUYXNrKHRhc2tOYW1lKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcih0YXNrID0+IHRhc2suZ2V0TmFtZSgpICE9PSB0YXNrTmFtZSlcbiAgICB9XG59IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9Qcm9qZWN0JztcbmltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi9Ub2RvTGlzdCc7XG5cblxuY29uc3Qgc2V0TG9jYWxTdG9yYWdlID0gKHRvZG9MaXN0KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9MaXN0JyxKU09OLnN0cmluZ2lmeSh0b2RvTGlzdCkpO1xufVxuXG5jb25zdCBnZXRMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgLy8gRmlyc3QsIHdlIGdldCB0aGUgdG9kb0xpc3QgZnJvbSBzdG9yYWdlIGFuZCBhc3NpZ24gdGhlIG1ldGhvZHNcbiAgICBsZXQgdG9kb0xpc3QgPSBPYmplY3QuYXNzaWduKG5ldyBUb2RvTGlzdCgpLEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9MaXN0JykpKTtcblxuICAgIC8vIFRoZW4sIGdldCB0aGUgcHJvamVjdHMsIGFzc2lnbiB0aGUgbWV0aG9kcyB3aXRoIG1hcCgpIGFuZCBzZXQgcHJvamVjdHMgd2l0aCBtZXRob2RzIGluIHRoZSBhcnJheVxuICAgIHRvZG9MaXN0LnNldFByb2plY3RzKHRvZG9MaXN0LmdldFByb2plY3RzKCkubWFwKHByb2plY3QgPT4gT2JqZWN0LmFzc2lnbihuZXcgUHJvamVjdCgpLHByb2plY3QpKSk7XG5cbiAgICAvLyBGaW5hbGx5LCBmb3IgZWFjaCBwcm9qZWN0LCBnZXQgdGhlIHRhc2tzLCBhc3NpZ24gbWV0aG9kcyBhbmQgc2V0IHRoZW0gaW4gdGhlIGFycmF5XG4gICAgdG9kb0xpc3QuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5zZXRUYXNrcyhwcm9qZWN0LmdldFRhc2tzKCkubWFwKHRhc2sgPT4gT2JqZWN0LmFzc2lnbihuZXcgVGFzaygpLHRhc2spKSkpO1xuXG4gICAgcmV0dXJuIHRvZG9MaXN0O1xufVxuXG5jb25zdCBzZXRQcm9qZWN0SW5TdG9yYWdlID0gKHByb2plY3QpID0+IHtcbiAgICBsZXQgdG9kb0xpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICBpZiAodG9kb0xpc3QuYWRkUHJvamVjdChwcm9qZWN0KSl7XG4gICAgICAgIHNldExvY2FsU3RvcmFnZSh0b2RvTGlzdCk7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSByZXR1cm4gZmFsc2VcbiAgICBcbn1cblxuY29uc3Qgc2V0VGFza0luU3RvcmFnZSA9ICh0YXNrKSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgbGV0IHByb2plY3RPZlRhc2sgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PSB0YXNrLmdldFByb2plY3QoKSk7XG4gICAgcHJvamVjdE9mVGFzay5hZGRUYXNrKHRhc2spO1xuICAgIHNldExvY2FsU3RvcmFnZSh0b2RvTGlzdCk7XG59ICAgXG5cblxuZXhwb3J0IHtzZXRMb2NhbFN0b3JhZ2UsZ2V0TG9jYWxTdG9yYWdlLHNldFByb2plY3RJblN0b3JhZ2Usc2V0VGFza0luU3RvcmFnZX0iLCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhc2sge1xuXG4gICAgY29uc3RydWN0b3IgKG5hbWUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSxwcm9qZWN0KXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gKHByaW9yaXR5ID09PSAnb24nKSA/ICdvbicgOiAnb2ZmJztcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdFxuICAgIH1cblxuICAgIGdldE5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcbiAgICB9XG4gICAgc2V0TmFtZShuYW1lKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIH1cbiAgICBzZXREZXNjcmlwdGlvbihkZXNjKXtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NcbiAgICB9XG4gICAgZ2V0RGVzY3JpcHRpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb25cbiAgICB9XG4gICAgc2V0RHVlRGF0ZShkYXRlKXtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZGF0ZVxuICAgIH1cbiAgICBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuICAgIHNldFByaW9yaXR5KHByaW9yaXR5KXtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHRoaXMucHJpb3JpdHkgPSAocHJpb3JpdHkgPT09ICdvbicpID8gJ29uJyA6ICdvZmYnO1xuICAgIH1cbiAgICBnZXRQcmlvcml0eSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eVxuICAgIH1cbiAgICBzZXRQcm9qZWN0KHByb2plY3Qpe1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG4gICAgfVxuICAgIGdldFByb2plY3QoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdFxuICAgIH1cbn1cbiIsIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0xpc3Qge1xuICAgIGNvbnN0cnVjdG9yICgpe1xuICAgICAgICB0aGlzLnByb2plY3RzID0gW107XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzO1xuICAgIH1cbiAgICBzZXRQcm9qZWN0cyhwcm9qZWN0cyl7XG4gICAgICAgIHRoaXMucHJvamVjdHMgPSBwcm9qZWN0c1xuICAgIH1cbiAgICBhZGRQcm9qZWN0KG5ld1Byb2plY3Qpe1xuICAgICAgICBpZiAodGhpcy5wcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5uYW1lID09IG5ld1Byb2plY3QubmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBkZWxldGVQcm9qZWN0KHByb2plY3ROYW1lKXtcbiAgICAgICAgbGV0IHByb2plY3RUb0RlbGV0ZSA9IHRoaXMucHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QubmFtZSA9PSBwcm9qZWN0TmFtZSk7XG4gICAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKHRoaXMucHJvamVjdHMuaW5kZXhPZihwcm9qZWN0VG9EZWxldGUpLDEpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBvcGVuTW9kYWwsIHJlbmRlckhvbWVUYWIscmVuZGVyUHJpb3JpdHlUYWIsY2xvc2VNb2RhbCxjbGVhckVycm9yTXNnLGNsZWFyRm9ybSxyZW5kZXJFZGl0VGFza01vZGFsLHJlbmRlclByb2plY3RUYXNrcyxyZW5kZXJQcm9qZWN0LHJlbmRlclRhc2sscmVtb3ZlVGFza0Zyb21TY3JlZW4scmVuZGVyRXJyb3JNc2cscmVtb3ZlUHJvamVjdEZyb21TY3JlZW4gfSBmcm9tICcuL1JlbmRlcic7XG5cbmltcG9ydCB7IGNyZWF0ZVByb2plY3QsIGdldEZvcm1EYXRhLGZvcm1WYWxpZGF0aW9uLCBkZWxldGVUYXNrRnJvbVN0b3JhZ2UsY3JlYXRlVGFzayxkZWxldGVQcm9qZWN0RnJvbVN0b3JhZ2UgfSBmcm9tICcuLi9sb2dpYyc7XG5cblxuY29uc3Qgc2V0RGVmYXVsdEV2ZW50TGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFzaWRlLWhvbWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycscmVuZGVySG9tZVRhYik7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZGF5JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGRpc3BsYXlUb2RheVRhYik7XG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlZWsnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZGlzcGxheVdlZWtUYWIpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hc2lkZS1wcmlvcml0eScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxyZW5kZXJQcmlvcml0eVRhYik7XG5cbiAgICBzZXRBZGRUYXNrTW9kYWxMaXN0ZW5lcnMoKTtcbiAgICBzZXRQcm9qZWN0TW9kYWxMaXN0ZW5lcnMoKTtcbiAgICBzZXRFZGl0VGFza01vZGFsTGlzdGVuZXJzKCk7XG59XG5cblxuY29uc3Qgc2V0QWRkVGFza01vZGFsTGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgLy8gRE9NIGVsZW1lbnRzXG4gICAgY29uc3QgY2xvc2VNb2RhbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsLWNsb3NlLWJ0bicpO1xuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRUYXNrLW1vZGFsLW92ZXJsYXknKTtcbiAgICBjb25zdCBzdWJtaXRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFRhc2stbW9kYWwtYnRuJyk7XG5cbiAgICAvLyBFdmVudCBMaXN0ZW5lcnNcbiAgICBzZXRBZGRUYXNrQnRuRXZlbnRMaXN0ZW5lcigpO1xuXG4gICAgY2xvc2VNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY2xvc2VNb2RhbCgnLmFkZFRhc2stbW9kYWwtb3ZlcmxheScpO1xuICAgICAgICBjbGVhckZvcm0oJ2FkZFRhc2stZm9ybScpO1xuICAgICAgICBjbGVhckVycm9yTXNnKCcuYWRkVGFzay1lcnJvci1tc2cnKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XG4gICAgICAgICAgICBjbGVhckZvcm0oJ2FkZFRhc2stZm9ybScpO1xuICAgICAgICAgICAgY2xvc2VNb2RhbCgnLmFkZFRhc2stbW9kYWwtb3ZlcmxheScpO1xuICAgICAgICAgICAgY2xlYXJFcnJvck1zZygnLmFkZFRhc2stZXJyb3ItbXNnJyk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHN1Ym1pdFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCB0YXNrID0gZ2V0Rm9ybURhdGEoJ2FkZFRhc2stZm9ybScpO1xuICAgICAgICBpZiAoZm9ybVZhbGlkYXRpb24odGFza1swXSkpIHtcbiAgICAgICAgICAgIHJlbmRlclRhc2soY3JlYXRlVGFzayh0YXNrWzBdLHRhc2tbMV0sdGFza1syXSx0YXNrWzRdLHRhc2tbM10pKTtcbiAgICAgICAgICAgIGNsZWFyRm9ybSgnYWRkVGFzay1mb3JtJyk7XG4gICAgICAgICAgICBjbG9zZU1vZGFsKCcuYWRkVGFzay1tb2RhbC1vdmVybGF5Jyk7XG4gICAgICAgICAgICBjbGVhckVycm9yTXNnKCcuYWRkVGFzay1lcnJvci1tc2cnKTsgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJFcnJvck1zZygnLmFkZFRhc2stZXJyb3ItbXNnJywnKkNvbXBsZXRlIHRoZSB0aXRsZSBmaWVsZCcpO1xuICAgICAgICB9XG4gICAgfSlcbn07XG5cblxuY29uc3Qgc2V0RWRpdFRhc2tNb2RhbExpc3RlbmVycyA9ICgpID0+IHtcblxuICAgIC8vIERPTSBlbGVtZW50c1xuICAgIGNvbnN0IGNsb3NlTW9kYWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdFRhc2stbW9kYWwtY2xvc2UnKTtcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza0luZm8tbW9kYWwtb3ZlcmxheScpO1xuICAgIGNvbnN0IHN1Ym1pdFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdFRhc2stbW9kYWwtYnRuJyk7XG4gICAgY29uc3QgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtdGFzaycpO1xuXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXG4gICAgY2xvc2VNb2RhbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY2xvc2VNb2RhbCgnLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXknKTtcbiAgICAgICAgY2xlYXJGb3JtKCd0YXNrSW5mby1mb3JtJyk7XG4gICAgICAgIGNsZWFyRXJyb3JNc2coJy5lZGl0VGFzay1lcnJvci1tc2cnKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoJy50YXNrSW5mby1tb2RhbC1vdmVybGF5Jyk7XG4gICAgICAgICAgICBjbGVhckZvcm0oJ3Rhc2tJbmZvLWZvcm0nKTtcbiAgICAgICAgICAgIGNsZWFyRXJyb3JNc2coJy5lZGl0VGFzay1lcnJvci1tc2cnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWlucHV0LXRpdGxlJykudGV4dENvbnRlbnQ7XG4gICAgICAgIGxldCBhcnJheVRhc2sgPSBnZXRGb3JtRGF0YSgndGFza0luZm8tZm9ybScpO1xuICAgICAgICByZW1vdmVUYXNrRnJvbVNjcmVlbih0YXNrVGl0bGUpO1xuICAgICAgICBkZWxldGVUYXNrRnJvbVN0b3JhZ2UodGFza1RpdGxlKTtcblxuICAgICAgICBsZXQgdGFzayA9IGNyZWF0ZVRhc2sodGFza1RpdGxlLGFycmF5VGFza1sxXSxhcnJheVRhc2tbMl0sYXJyYXlUYXNrWzRdLGFycmF5VGFza1szXSk7ICAgICAgXG4gICAgICAgIHJlbmRlclRhc2sodGFzayk7XG4gICAgICAgIGNsb3NlTW9kYWwoJy50YXNrSW5mby1tb2RhbC1vdmVybGF5Jyk7XG4gICAgICAgIGNsZWFyRm9ybSgndGFza0luZm8tZm9ybScpO1xuICAgICAgICBjbGVhckVycm9yTXNnKCcuZWRpdFRhc2stZXJyb3ItbXNnJyk7XG4gICAgfSk7XG5cbiAgICBkZWxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWlucHV0LXRpdGxlJyk7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza0luZm8tZm9ybScpKTtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGRlbGV0ZVRhc2tGcm9tU3RvcmFnZSh0aXRsZS50ZXh0Q29udGVudCk7XG4gICAgICAgIHJlbW92ZVRhc2tGcm9tU2NyZWVuKHRpdGxlLnRleHRDb250ZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCgnLnRhc2tJbmZvLW1vZGFsLW92ZXJsYXknKTtcbiAgICAgICAgY2xlYXJGb3JtKCd0YXNrSW5mby1mb3JtJyk7XG4gICAgICAgIGNsZWFyRXJyb3JNc2coJy5lZGl0VGFzay1lcnJvci1tc2cnKTtcbiAgICB9KVxufTtcblxuY29uc3Qgc2V0UHJvamVjdE1vZGFsTGlzdGVuZXJzID0gKCkgPT4ge1xuXG4gICAgLy8gRE9NIEVsZW1lbnRzXG4gICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idG4nKTtcbiAgICBjb25zdCBjbG9zZU1vZGFsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwtY2xvc2UtYnRuJyk7XG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZFByb2plY3QtbW9kYWwtb3ZlcmxheScpO1xuICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsLXN1Ym1pdCcpO1xuXG4gICAgLy8gRXZlbnQgTGlzdGVuZXJzXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgb3Blbk1vZGFsKCcuYWRkUHJvamVjdC1tb2RhbC1vdmVybGF5JylcbiAgICB9KTtcblxuICAgIGNsb3NlTW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNsb3NlTW9kYWwoJy5hZGRQcm9qZWN0LW1vZGFsLW92ZXJsYXknKTtcbiAgICAgICAgY2xlYXJGb3JtKCdhZGRQcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgY2xlYXJFcnJvck1zZygnLnByb2plY3QtZXJyb3ItbXNnJyk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xuICAgICAgICAgICAgY2xvc2VNb2RhbCgnLmFkZFByb2plY3QtbW9kYWwtb3ZlcmxheScpO1xuICAgICAgICAgICAgY2xlYXJGb3JtKCdhZGRQcm9qZWN0LWZvcm0nKTtcbiAgICAgICAgICAgIGNsZWFyRXJyb3JNc2coJy5wcm9qZWN0LWVycm9yLW1zZycpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1uYW1lJykudmFsdWU7XG5cbiAgICAgICAgaWYgKGZvcm1WYWxpZGF0aW9uKHByb2plY3ROYW1lKSl7XG4gICAgICAgICAgICBsZXQgcHJvamVjdCA9IGNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgaWYgKHByb2plY3Qpe1xuICAgICAgICAgICAgICAgIHJlbmRlclByb2plY3QocHJvamVjdCk7XG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgnLmFkZFByb2plY3QtbW9kYWwtb3ZlcmxheScpO1xuICAgICAgICAgICAgICAgIGNsZWFyRm9ybSgnYWRkUHJvamVjdC1mb3JtJyk7XG4gICAgICAgICAgICAgICAgY2xlYXJFcnJvck1zZygnLnByb2plY3QtZXJyb3ItbXNnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlFcnJvck1zZygnLnByb2plY3QtZXJyb3ItbXNnJywnKlRoaXMgcHJvamVjdCBoYXMgYWxyZWFkeSBiZWVuIHVzZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlbmRlckVycm9yTXNnKCcucHJvamVjdC1lcnJvci1tc2cnLCcqQ29tcGxldGUgdGhlIGZpZWxkIHdpdGggdHdvIG9yIG1vcmUgd29yZHMnKTtcbiAgICAgICAgfVxuICAgIH0pXG59O1xuXG5cbmNvbnN0IHNldEFkZFRhc2tCdG5FdmVudExpc3RlbmVyID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgb3Blbk1vZGFsKCcuYWRkVGFzay1tb2RhbC1vdmVybGF5Jyk7XG59KTtcblxuY29uc3Qgc2V0UHJvamVjdFRhYkxpc3RlbmVycyA9IChpZCkgPT4ge1xuICAgIGxldCBwcm9qZWN0VGFiID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIHByb2plY3RUYWIuY2hpbGRyZW5bMV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICByZW5kZXJQcm9qZWN0VGFza3MoZSk7XG4gICAgfSk7XG4gICAgcHJvamVjdFRhYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0VGFiLmNoaWxkcmVuWzJdLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIH0pXG4gICAgcHJvamVjdFRhYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgIHByb2plY3RUYWIuY2hpbGRyZW5bMl0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICB9KTtcbiAgICBwcm9qZWN0VGFiLmNoaWxkcmVuWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBpZC5zcGxpdCgnLScpLmpvaW4oJyAnKTtcbiAgICAgICAgcmVtb3ZlUHJvamVjdEZyb21TY3JlZW4oaWQpO1xuICAgICAgICBkZWxldGVQcm9qZWN0RnJvbVN0b3JhZ2UocHJvamVjdE5hbWUpO1xuICAgICAgICByZW5kZXJIb21lVGFiKCk7XG5cbiAgICB9KVxufVxuXG5jb25zdCBzZXRFZGl0VGFza0xpc3RlbmVyID0gKGlkKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC5jaGlsZHJlblsxXS50ZXh0Q29udGVudDtcbiAgICAgICAgcmVuZGVyRWRpdFRhc2tNb2RhbCh0aXRsZSk7XG4gICAgfSlcbn1cblxuXG5leHBvcnQge3NldERlZmF1bHRFdmVudExpc3RlbmVycyxzZXRBZGRUYXNrQnRuRXZlbnRMaXN0ZW5lcixzZXRQcm9qZWN0VGFiTGlzdGVuZXJzLHNldEVkaXRUYXNrTGlzdGVuZXJ9IiwiaW1wb3J0IHsgZGlzcGxheVByaW9yaXR5VGFza3MsIGRpc3BsYXlUYXNrc0luU3RvcmFnZSwgZGlzcGxheVRhc2tzT2ZQcm9qZWN0cywgZ2V0VGFza0J5TmFtZSB9IGZyb20gJy4uL2xvZ2ljJztcbmltcG9ydCB7IHNldFByb2plY3RUYWJMaXN0ZW5lcnMsIHNldEFkZFRhc2tCdG5FdmVudExpc3RlbmVyLHNldEVkaXRUYXNrTGlzdGVuZXIgfSBmcm9tICcuL0V2ZW50TGlzdGVuZXJzJztcblxubGV0IG1haW5UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXRpdGxlJyk7XG5jb25zdCB0YXNrQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stY29udGFpbmVyJyk7XG5jb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cy1jb250YWluZXInKTtcblxuXG5jb25zdCByZW5kZXJUYXNrID0gKHRhc2spID0+IHtcbiAgICBsZXQgZWRpdElkID0gdGFzay5uYW1lLnNwbGl0KCcgJykuam9pbignLScpO1xuICAgIGxldCB0YXNrSWQgPSB0YXNrLm5hbWUuc3BsaXQoJyAnKS5qb2luKCcvJylcbiAgICBsZXQgcHJpb3JpdHlJY29uO1xuICAgICh0YXNrLnByaW9yaXR5ID09PSAnb24nKSA/IHByaW9yaXR5SWNvbiA9ICdmYS1zb2xpZCBmYS1zdGFyJyA6IHByaW9yaXR5SWNvbiA9ICdmYS1yZWd1bGFyIGZhLXN0YXInO1xuICAgIFxuICAgIGxldCBtYWluVGFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1haW5UYXNrLmNsYXNzTGlzdC5hZGQoJ21haW4tdGFzaycpO1xuICAgIG1haW5UYXNrLnNldEF0dHJpYnV0ZSgnaWQnLHRhc2tJZCk7XG4gICAgbWFpblRhc2suaW5uZXJIVE1MID0gXG4gICAgYDxkaXY+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiY2hlY2tcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stbmFtZVwiPiR7dGFzay5uYW1lfTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGVcIj4ke3Rhc2suZHVlRGF0ZX08L2Rpdj5cbiAgICAgICAgPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wZW4tdG8tc3F1YXJlXCIgaWQ9XCIke2VkaXRJZH1cIj48L2k+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcmlvcml0eVwiPjxpIGNsYXNzPVwiJHtwcmlvcml0eUljb259XCI+PC9pPjwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgdGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChtYWluVGFzayk7XG4gICAgbW92ZUFkZEJ1dHRvbigpO1xuICAgIHNldEVkaXRUYXNrTGlzdGVuZXIoZWRpdElkKTtcbn1cblxuY29uc3QgcmVuZGVyUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IHRhYlByb2plY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaWQgPSBwcm9qZWN0LmdldE5hbWUoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTtcblxuICAgIHRhYlByb2plY3QuY2xhc3NMaXN0LmFkZCgndGFiLXByb2plY3QnKTtcbiAgICB0YWJQcm9qZWN0LnNldEF0dHJpYnV0ZSgnaWQnLGlkKVxuICAgIHRhYlByb2plY3QuaW5uZXJIVE1MID0gXG4gICAgYDxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlXCI+PC9pPlxuICAgIDxkaXY+JHtwcm9qZWN0LmdldE5hbWUoKX08L2Rpdj5cbiAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXhtYXJrIGhpZGRlblwiPjwvaT5gO1xuICAgIHByb2plY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhYlByb2plY3QpO1xuXG4gICAgc2V0UHJvamVjdFRhYkxpc3RlbmVycyhpZCk7XG59XG5cblxuY29uc3QgcmVuZGVySG9tZVRhYiA9ICgpID0+IHtcbiAgICBtYWluVGl0bGUudGV4dENvbnRlbnQgPSAnSG9tZSc7XG4gICAgY2xlYXJUYXNrQ29udGFpbmVyKCk7XG4gICAgZGlzcGxheVRhc2tzSW5TdG9yYWdlKCk7XG59XG5cbmNvbnN0IHJlbmRlclByb2plY3RUYXNrcyA9IChlKSA9PiB7XG4gICAgbGV0IHByb2plY3RUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIG1haW5UaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RUaXRsZVxuICAgIGNsZWFyVGFza0NvbnRhaW5lcigpO1xuICAgIGRpc3BsYXlUYXNrc09mUHJvamVjdHMocHJvamVjdFRpdGxlKTtcbn1cblxuY29uc3QgcmVuZGVyUHJpb3JpdHlUYWIgPSAoKSA9PiB7XG4gICAgbWFpblRpdGxlLnRleHRDb250ZW50ID0gJ1ByaW9yaXR5JztcbiAgICBjbGVhclRhc2tDb250YWluZXIoKTtcbiAgICBkaXNwbGF5UHJpb3JpdHlUYXNrcygpO1xufVxuXG5jb25zdCByZW5kZXJFZGl0VGFza01vZGFsID0gKG5hbWUpID0+IHtcbiAgICBsZXQgdGFzayA9IGdldFRhc2tCeU5hbWUobmFtZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tJbmZvLW1vZGFsLXRpdGxlJykudGV4dENvbnRlbnQgPSBuYW1lO1xuXG4gICAgb3Blbk1vZGFsKCcudGFza0luZm8tbW9kYWwtb3ZlcmxheScpO1xuICAgIHNldFRhc2tGb3JtRGF0YSh0YXNrKTtcbn1cblxuY29uc3Qgc2V0VGFza0Zvcm1EYXRhID0gKHRhc2spID0+IHtcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWlucHV0LXRpdGxlJyk7XG4gICAgbGV0IGlucHV0RGVzYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LXRhc2staW5wdXQtZGVzYycpO1xuICAgIGxldCBpbnB1dERhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWlucHV0LWRhdGUnKTtcbiAgICBsZXQgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1pbnB1dC1wcm9qZWN0Jyk7XG4gICAgbGV0IGlucHV0UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC10YXNrLWlucHV0LXByaW9yaXR5Jyk7XG5cbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRhc2suZ2V0TmFtZSgpO1xuICAgIGlucHV0RGVzYy52YWx1ZSA9IHRhc2suZ2V0RGVzY3JpcHRpb24oKTtcbiAgICBpbnB1dERhdGUudmFsdWUgPSB0YXNrLmdldER1ZURhdGUoKTtcbiAgICBpbnB1dFByb2plY3QudmFsdWUgPSB0YXNrLmdldFByb2plY3QoKTtcbiAgICBpbnB1dFByaW9yaXR5LmNoZWNrZWQgPSAodGFzay5nZXRQcmlvcml0eSgpID09PSAnb24nKSA/IHRydWUgOiBmYWxzZTtcblxufVxuXG5jb25zdCBjbGVhclRhc2tDb250YWluZXIgPSAoKSA9PiB7XG4gICAgdGFza0NvbnRhaW5lci5pbm5lckhUTUwgPSBcbiAgICBgPGRpdiBjbGFzcz1cImFkZC10YXNrXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGx1c1wiPjwvaT5cbiAgICAgICAgPGRpdj5BZGQgVGFzazwvZGl2PlxuICAgIDwvZGl2PmA7XG4gICAgc2V0QWRkVGFza0J0bkV2ZW50TGlzdGVuZXIoKTtcbn1cblxuY29uc3QgcmVtb3ZlVGFza0Zyb21TY3JlZW4gPSAobmFtZSkgPT4ge1xuICAgIGxldCBpZCA9IG5hbWUuc3BsaXQoJyAnKS5qb2luKCcvJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnJlbW92ZSgpO1xufTtcblxuY29uc3QgcmVtb3ZlUHJvamVjdEZyb21TY3JlZW4gPSAoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5yZW1vdmUoKTtcblxuXG5jb25zdCBtb3ZlQWRkQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuICAgIChhZGRUYXNrQnRuLm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkgPyB0YXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKGFkZFRhc2tCdG4pIDogMDtcbn1cblxuY29uc3QgcmVuZGVyRXJyb3JNc2cgPSAoQ2xhc3MsbXNnKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENsYXNzKS50ZXh0Q29udGVudCA9IG1zZztcbmNvbnN0IGNsZWFyRXJyb3JNc2cgPSAoQ2xhc3MpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2xhc3MpLnRleHRDb250ZW50ID0gJyc7XG5cbmNvbnN0IG9wZW5Nb2RhbCA9IENsYXNzID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoQ2xhc3MpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbmNvbnN0IGNsb3NlTW9kYWwgPSBDbGFzcyA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKENsYXNzKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG5cbmNvbnN0IGNsZWFyRm9ybSA9IChpZCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLnJlc2V0KCk7XG5cbmNvbnN0IHVwZGF0ZU1vZGFsU2VsZWN0b3JzID0gKHZhbHVlKSA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIHRvIGFkZCBpcyBhbHJlYWR5IGFkZGVkIHRvIGF2b2lkIHJlcGV0aXRpb25zXG5cbiAgICBjb25zdCBhZGRUYXNrU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLXNlbGVjdCcpO1xuICAgIGNvbnN0IGVkaXRUYXNrU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtdGFzay1pbnB1dC1wcm9qZWN0Jyk7XG4gICAgXG4gICAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShhZGRUYXNrU2VsZWN0LmNoaWxkcmVuKTtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKXtcbiAgICAgICAgYWRkVGFza1NlbGVjdC5pbm5lckhUTUwgKz0gYDxvcHRpb24gdmFsdWU9XCIke3ZhbHVlfVwiPiR7dmFsdWV9PC9vcHRpb24+YDtcbiAgICAgICAgZWRpdFRhc2tTZWxlY3QuaW5uZXJIVE1MICs9IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIj4ke3ZhbHVlfTwvb3B0aW9uPmA7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBva2V5ID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBvcHRpb24gb2YgY2hpbGRyZW4pe1xuICAgICAgICBpZiAob3B0aW9uLnRleHRDb250ZW50ID09PSB2YWx1ZSl7XG4gICAgICAgICAgICBva2V5ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChva2V5KSB7XG4gICAgICAgIGFkZFRhc2tTZWxlY3QuaW5uZXJIVE1MICs9IGA8b3B0aW9uIHZhbHVlPVwiJHt2YWx1ZX1cIj4ke3ZhbHVlfTwvb3B0aW9uPmA7XG4gICAgICAgIGVkaXRUYXNrU2VsZWN0LmlubmVySFRNTCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7dmFsdWV9XCI+JHt2YWx1ZX08L29wdGlvbj5gO1xuICAgIH1cbn1cblxuXG5leHBvcnQge3JlbmRlclRhc2sscmVuZGVyUHJvamVjdCx1cGRhdGVNb2RhbFNlbGVjdG9ycyxyZW5kZXJIb21lVGFiLHJlbmRlclByaW9yaXR5VGFiLGNsb3NlTW9kYWwsb3Blbk1vZGFsLGNsZWFyRXJyb3JNc2cscmVuZGVyRWRpdFRhc2tNb2RhbCxyZW5kZXJFcnJvck1zZyxjbGVhckZvcm0scmVuZGVyUHJvamVjdFRhc2tzLHJlbW92ZVRhc2tGcm9tU2NyZWVuLHJlbW92ZVByb2plY3RGcm9tU2NyZWVufSIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFzayc7XG5pbXBvcnQgUHJvamVjdCBmcm9tICcuL1Byb2plY3QnO1xuaW1wb3J0IHsgcmVuZGVyVGFzayxyZW5kZXJQcm9qZWN0LHVwZGF0ZU1vZGFsU2VsZWN0b3JzIH0gZnJvbSAnLi9VSS9SZW5kZXInO1xuaW1wb3J0IHsgZ2V0TG9jYWxTdG9yYWdlLCBzZXRQcm9qZWN0SW5TdG9yYWdlLCBzZXRUYXNrSW5TdG9yYWdlLCBzZXRMb2NhbFN0b3JhZ2V9IGZyb20gJy4vU3RvcmFnZSc7XG5cblxuXG5jb25zdCBjcmVhdGVUYXNrID0gKHRpdGxlLGRlc2NyaXB0aW9uLGRhdGUscHJpb3JpdHkscHJvamVjdCkgPT4ge1xuICAgIGxldCB0YXNrID0gbmV3IFRhc2sodGl0bGUsZGVzY3JpcHRpb24sZGF0ZSxwcmlvcml0eSxwcm9qZWN0KTsgXG4gICAgc2V0VGFza0luU3RvcmFnZSh0YXNrKTtcbiAgICByZXR1cm4gdGFza1xufVxuXG5jb25zdCBjcmVhdGVQcm9qZWN0ID0gKG5hbWUpID0+IHtcbiAgICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgIGlmIChzZXRQcm9qZWN0SW5TdG9yYWdlKHByb2plY3QpKXtcbiAgICAgICAgdXBkYXRlTW9kYWxTZWxlY3RvcnMobmFtZSk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0XG4gICAgfSByZXR1cm4gZmFsc2VcbiAgICBcbn1cbiBcblxuY29uc3QgY3JlYXRlRGVmYXVsdENvbnRlbnQgPSAoKSA9PiB7XG5cbiAgICBjcmVhdGVQcm9qZWN0KCdObyBQcm9qZWN0Jyk7XG4gICAgY3JlYXRlUHJvamVjdCgnREFwcCcpO1xuICAgIGNyZWF0ZVByb2plY3QoJ0NsZWFuIEhvdXNlJyk7XG5cbiAgICBjcmVhdGVUYXNrKCdEbyB0aGUgd2FzaGluZyB1cCcsJ1VzZSB0aGUgYXBwcm9waWF0ZSBkaXNod2FzaGVyJywnMjAyMi0wNC0yOScsJ29mZicsJ0NsZWFuIEhvdXNlJyk7XG4gICAgY3JlYXRlVGFzaygnRGVidWcgdGhlIHNtYXJ0IGNvbnRyYWN0JywnJywnMjAyMi0wNS0wMScsJ29uJywnREFwcCcpO1xuICAgIGNyZWF0ZVRhc2soJ1ZhY3V1bWluZyB0aGUgYmFzZW1lbnQnLCcnLCcyMDIyLTA0LTMwJywnb2ZmJywnQ2xlYW4gSG91c2UnKTtcbn1cblxuY29uc3QgcmVtb3ZlRGVmYXVsdFByb2plY3RGcm9tU2NyZWVuID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWNvbnRhaW5lcicpLmZpcnN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuXG5jb25zdCBkaXNwbGF5Q29udGVudEluU3RvcmFnZSA9ICgpID0+IHtcbiAgICBkaXNwbGF5UHJvamVjdHNJblN0b3JhZ2UoKTtcbiAgICBkaXNwbGF5VGFza3NJblN0b3JhZ2UoKTtcbn1cblxuY29uc3QgZGlzcGxheVByb2plY3RzSW5TdG9yYWdlID0gKCkgPT4ge1xuICAgIGxldCB0b2RvTGlzdCA9IGdldExvY2FsU3RvcmFnZSgpO1xuICAgIHRvZG9MaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgcmVuZGVyUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgdXBkYXRlTW9kYWxTZWxlY3RvcnMocHJvamVjdC5nZXROYW1lKCkpO1xuICAgIH0pO1xuICAgIHJlbW92ZURlZmF1bHRQcm9qZWN0RnJvbVNjcmVlbigpO1xuICAgIFxufVxuXG5jb25zdCBkaXNwbGF5VGFza3NJblN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgdG9kb0xpc3QuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5nZXRUYXNrcygpLmZvckVhY2godGFzayA9PiByZW5kZXJUYXNrKHRhc2spKSk7XG59XG5cbmNvbnN0IGRpc3BsYXlUYXNrc09mUHJvamVjdHMgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICBsZXQgdG9kb0xpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICBsZXQgcHJvamVjdFRvRGlzcGxheSA9IHRvZG9MaXN0LmdldFByb2plY3RzKCkuZmluZChwcm9qZWN0ID0+IHByb2plY3QuZ2V0TmFtZSgpID09IHByb2plY3ROYW1lKTtcbiAgICBwcm9qZWN0VG9EaXNwbGF5LmdldFRhc2tzKCkuZm9yRWFjaCh0YXNrID0+IHJlbmRlclRhc2sodGFzaykpO1xufVxuXG5jb25zdCBkaXNwbGF5UHJpb3JpdHlUYXNrcyA9ICgpID0+IHtcbiAgICBsZXQgdG9kb0xpc3QgPSBnZXRMb2NhbFN0b3JhZ2UoKTtcbiAgICBsZXQgdGFza1RvRGlzcGxheSA9IHRvZG9MaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaChwcm9qZWN0ID0+IHByb2plY3QuZ2V0VGFza3MoKS5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAodGFzay5nZXRQcmlvcml0eSgpID09PSBcIm9uXCIpe1xuICAgICAgICAgICAgcmVuZGVyVGFzayh0YXNrKTtcbiAgICAgICAgfVxuICAgIH0pKVxufTtcblxuY29uc3QgZ2V0VGFza0J5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgbGV0IHJldHVyblRhc2s7XG4gICAgZ2V0TG9jYWxTdG9yYWdlKCkuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5nZXRUYXNrcygpLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGlmICh0YXNrLmdldE5hbWUoKSA9PT0gbmFtZSl7XG4gICAgICAgICAgICByZXR1cm5UYXNrID0gdGFza1xuICAgICAgICB9XG4gICAgfSkpXG4gICAgcmV0dXJuIHJldHVyblRhc2s7XG59XG5cbmNvbnN0IGdldFByb2plY3RPZlRhc2sgPSAodGFza05hbWUpID0+IHtcbiAgICBsZXQgcHJvamVjdE5hbWU7XG4gICAgZ2V0TG9jYWxTdG9yYWdlKCkuZ2V0UHJvamVjdHMoKS5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5nZXRUYXNrKHRhc2tOYW1lKSl7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZSA9IHByb2plY3QuZ2V0TmFtZSgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcHJvamVjdE5hbWVcbn1cblxuY29uc3QgZGVsZXRlVGFza0Zyb21TdG9yYWdlID0gKHRhc2tOYW1lKSA9PiB7XG4gICAgbGV0IHByb2plY3ROYW1lID0gZ2V0UHJvamVjdE9mVGFzayh0YXNrTmFtZSk7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgbGV0IHByb2plY3QgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gcHJvamVjdE5hbWUpO1xuICAgIHByb2plY3QucmVtb3ZlVGFzayh0YXNrTmFtZSk7XG4gICAgc2V0TG9jYWxTdG9yYWdlKHRvZG9MaXN0KTtcbn1cblxuY29uc3QgZGVsZXRlUHJvamVjdEZyb21TdG9yYWdlID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgbGV0IHRvZG9MaXN0ID0gZ2V0TG9jYWxTdG9yYWdlKCk7XG4gICAgdG9kb0xpc3QuZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgc2V0TG9jYWxTdG9yYWdlKHRvZG9MaXN0KTtcbn1cblxuXG5jb25zdCBnZXRGb3JtRGF0YSA9IChpZCkgPT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgbGV0IHRpdGxlID0gZm9ybURhdGEuZ2V0KCd0aXRsZScpO1xuICAgIGxldCBkZXNjcmlwdGlvbiA9IGZvcm1EYXRhLmdldCgnZGVzY3JpcHRpb24nKTtcbiAgICBsZXQgZGF0ZSA9IGZvcm1EYXRhLmdldCgnZGF0ZScpO1xuICAgIGxldCBwcm9qZWN0ID0gZm9ybURhdGEuZ2V0KCdwcm9qZWN0Jyk7XG4gICAgbGV0IHByaW9yaXR5ID0gZm9ybURhdGEuZ2V0KCdwcmlvcml0eScpO1xuXG4gICAgcmV0dXJuIFt0aXRsZSxkZXNjcmlwdGlvbixkYXRlLHByb2plY3QscHJpb3JpdHldO1xufVxuXG5jb25zdCBmb3JtVmFsaWRhdGlvbiA9ICh0aXRsZSkgPT4gKHRpdGxlLmxlbmd0aCA8IDIpID8gZmFsc2UgOiB0cnVlO1xuXG5cblxuZXhwb3J0IHtjcmVhdGVEZWZhdWx0Q29udGVudCxkaXNwbGF5Q29udGVudEluU3RvcmFnZSxkaXNwbGF5VGFza3NJblN0b3JhZ2UsZGlzcGxheVRhc2tzT2ZQcm9qZWN0cyxkaXNwbGF5UHJpb3JpdHlUYXNrcyxjcmVhdGVUYXNrLGNyZWF0ZVByb2plY3QsZ2V0Rm9ybURhdGEsZm9ybVZhbGlkYXRpb24sZ2V0VGFza0J5TmFtZSxkZWxldGVUYXNrRnJvbVN0b3JhZ2UsZGVsZXRlUHJvamVjdEZyb21TdG9yYWdlfSAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNldERlZmF1bHRFdmVudExpc3RlbmVycyB9IGZyb20gJy4vVUkvRXZlbnRMaXN0ZW5lcnMnO1xuaW1wb3J0IHtjcmVhdGVEZWZhdWx0Q29udGVudCwgZGlzcGxheUNvbnRlbnRJblN0b3JhZ2V9IGZyb20gJy4vbG9naWMnO1xuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBjcmVhdGVEZWZhdWx0Q29udGVudCgpO1xuICAgIGRpc3BsYXlDb250ZW50SW5TdG9yYWdlKCk7XG4gICAgc2V0RGVmYXVsdEV2ZW50TGlzdGVuZXJzKCk7XG59KVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=