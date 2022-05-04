import { openModal, renderHomeTab,renderPriorityTab,closeModal,clearErrorMsg,clearForm,renderEditTaskModal,renderProjectTasks,renderProject,renderTask,removeTaskFromScreen,renderErrorMsg,removeProjectFromScreen } from "./Render";

import { createProject, getFormData,formValidation, deleteTaskFromStorage,createTask,deleteProjectFromStorage } from "../logic";


const setDefaultEventListeners = () => {

    document.querySelector(".aside-home").addEventListener("click",renderHomeTab);
    // document.querySelector(".today").addEventListener("click",displayTodayTab);
    // document.querySelector(".week").addEventListener("click",displayWeekTab);
    document.querySelector(".aside-priority").addEventListener("click",renderPriorityTab);

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
        closeModal(".addTask-modal-overlay");
        clearForm("addTask-form");
        clearErrorMsg(".addTask-error-msg");
    });
    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            clearForm("addTask-form");
            closeModal(".addTask-modal-overlay");
            clearErrorMsg(".addTask-error-msg");
        }
    })
    submitTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let task = getFormData("addTask-form");
        if (formValidation(task[0])) {
            renderTask(createTask(task[0],task[1],task[2],task[4],task[3]));
            clearForm("addTask-form");
            closeModal(".addTask-modal-overlay");
            clearErrorMsg(".addTask-error-msg"); 
        } else {
            renderErrorMsg(".addTask-error-msg","*Complete the title field");
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
        closeModal(".taskInfo-modal-overlay");
        clearForm("taskInfo-form");
        clearErrorMsg(".editTask-error-msg");
    });

    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal(".taskInfo-modal-overlay");
            clearForm("taskInfo-form");
            clearErrorMsg(".editTask-error-msg");
        }
    });

    submitTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const taskTitle = document.getElementById("edit-task-input-title").textContent;
        let arrayTask = getFormData("taskInfo-form");
        removeTaskFromScreen(taskTitle);
        deleteTaskFromStorage(taskTitle);

        let task = createTask(taskTitle,arrayTask[1],arrayTask[2],arrayTask[4],arrayTask[3]);      
        renderTask(task);
        closeModal(".taskInfo-modal-overlay");
        clearForm("taskInfo-form");
        clearErrorMsg(".editTask-error-msg");
    });

    deleteTaskBtn.addEventListener("click", (e) => {
        const title = document.getElementById("edit-task-input-title");
        let formData = new FormData(document.getElementById("taskInfo-form"));

        e.preventDefault();
        deleteTaskFromStorage(title.textContent);
        removeTaskFromScreen(title.textContent);
        closeModal(".taskInfo-modal-overlay");
        clearForm("taskInfo-form");
        clearErrorMsg(".editTask-error-msg");
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
        openModal(".addProject-modal-overlay")
    });

    closeModalBtn.addEventListener("click", () => {
        closeModal(".addProject-modal-overlay");
        clearForm("addProject-form");
        clearErrorMsg(".project-error-msg");
    });
    document.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal(".addProject-modal-overlay");
            clearForm("addProject-form");
            clearErrorMsg(".project-error-msg");
        }
    });
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let projectName = document.getElementById("project-name").value;

        if (formValidation(projectName)){
            let project = createProject(projectName);
            if (project){
                renderProject(project);
                closeModal(".addProject-modal-overlay");
                clearForm("addProject-form");
                clearErrorMsg(".project-error-msg");
            } else {
                displayErrorMsg(".project-error-msg","*This project has already been used");
            }
        } else {
            renderErrorMsg(".project-error-msg","*Complete the field with two or more words");
        }
    })
};


const setAddTaskBtnEventListener = () => document.querySelector(".add-task").addEventListener("click", () => {
    openModal(".addTask-modal-overlay");
});

const setProjectTabListeners = (id) => {
    let projectTab = document.getElementById(id);
    projectTab.children[1].addEventListener("click", (e) => {
        renderProjectTasks(e);
    });
    projectTab.addEventListener("mouseover", (e) => {
        projectTab.children[2].classList.remove("hidden");
    })
    projectTab.addEventListener("mouseout", (e) => {
        projectTab.children[2].classList.add("hidden")
    });
    projectTab.children[2].addEventListener("click", (e) => {
        const projectName = id.split("-").join(" ");
        removeProjectFromScreen(id);
        deleteProjectFromStorage(projectName);
        renderHomeTab();

    })
}

const setEditTaskListener = (id) => {
    document.getElementById(id).addEventListener("click", (e) => {
        const title = e.target.parentElement.parentElement.firstChild.children[1].textContent;
        renderEditTaskModal(title);
    })
}


export {setDefaultEventListeners,setAddTaskBtnEventListener,setProjectTabListeners,setEditTaskListener}