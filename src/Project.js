
export default class Project {
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