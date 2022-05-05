import Project from './Project';
import Task from './Task';
import TodoList from './TodoList';


const setLocalStorage = (todoList) => {
    localStorage.setItem('todoList',JSON.stringify(todoList));
}

const getLocalStorage = () => {
    // First, we get the todoList from storage and assign the methods
    let todoList = Object.assign(new TodoList(),JSON.parse(localStorage.getItem('todoList')));

    // Then, get the projects, assign the methods with map() and set projects with methods in the array
    todoList.setProjects(todoList.getProjects().map(project => Object.assign(new Project(),project)));

    // Finally, for each project, get the tasks, assign methods and set them in the array
    todoList.getProjects().forEach(project => project.setTasks(project.getTasks().map(task => Object.assign(new Task(),task))));

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


export {setLocalStorage,getLocalStorage,setProjectInStorage,setTaskInStorage}