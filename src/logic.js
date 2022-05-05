import Task from './Task';
import Project from './Project';
import { renderTask,renderProject,updateModalSelectors } from './UI/Render';
import { getLocalStorage, setProjectInStorage, setTaskInStorage, setLocalStorage} from './Storage';
import {isToday, isThisWeek, isTomorrow, format, isPast, isYesterday, compareAsc} from 'date-fns';



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
    let todoList = getLocalStorage();
    todoList.getProjects().forEach(project => {
        renderProject(project);
        updateModalSelectors(project.getName());
    });
    removeDefaultProjectFromScreen();
    
}

const displayTasksInStorage = () => {
    let tasks = [];
    getLocalStorage().getProjects().forEach(project => project.getTasks().forEach(task => {
        tasks.push(task);
    }));
    sortTasksByDate(tasks);
    tasks.forEach(task => renderTask(task))
}

const displayTasksOfProjects = (projectName) => {
    let todoList = getLocalStorage();
    let projectToDisplay = todoList.getProjects().find(project => project.getName() == projectName);
    console.log(projectToDisplay);
    projectToDisplay.sortTasksByDate();
    console.log(projectToDisplay);
    projectToDisplay.getTasks().forEach(task => renderTask(task));
}

const displayPriorityTasks = () => {
    let tasks = [];
    getLocalStorage().getProjects().forEach(project => project.getTasks().forEach(task => {
        if (task.getPriority() === "on"){
            tasks.push(task)
        }
    }))
    sortTasksByDate(tasks);
    tasks.forEach(task => renderTask(task));
};

const displayTodayTasks = () => {
    getLocalStorage().getProjects().forEach(project => project.getTasks().forEach(task => {
        if (isToday(new Date(task.getDueDate()))){
            renderTask(task);
        }
    }))
};

const displayWeekTasks = () => {
    let tasks = [];
    getLocalStorage().getProjects().forEach(project => project.getTasks().forEach(task => {
        if (isThisWeek(new Date(task.getDueDate()), {weekStartsOn: 1})){
            tasks.push(task);
        }
    }))
    sortTasksByDate(tasks);
    tasks.forEach(task => renderTask(task));
}

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

const deleteProjectFromStorage = (projectName) => {
    let todoList = getLocalStorage();
    todoList.deleteProject(projectName);
    setLocalStorage(todoList);
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

const formatDate = (date) => {
    if (isToday(new Date(date))){
        return 'Today';
    } else if (isTomorrow(new Date(date))){
        return 'Tomorrow';
    } else if (isYesterday(new Date(date))){
        return 'Yesterday';
    } else if (isPast(new Date(date))){
        return `Due Date has passed`;
    } else {
        return format(new Date(date), 'dd/MM/yyyy');
    }
}

const sortTasksByDate = (tasks) => {
    tasks.sort((a,b) => {
        return compareAsc(new Date(a.getDueDate()),new Date(b.getDueDate()));
    })  
    return tasks
}



export {createDefaultContent,displayContentInStorage,displayTasksInStorage,displayTasksOfProjects,displayPriorityTasks,createTask,createProject,getFormData,formValidation,getTaskByName,deleteTaskFromStorage,deleteProjectFromStorage,displayTodayTasks, displayWeekTasks, formatDate} 