//project.js
import { TodoList } from "./todoList.js";
import { Todo } from "./todo.js";

export function generateId(){
    return crypto.randomUUID();
}

export function serializeProject(project) {
    return {
        title: project.title,
        id: project.id,
        container: project.container.map((todoList) => ({
            id: todoList.id,
            title: todoList.title,
            description: todoList.description,
            projectID: todoList.projectID,
            container: todoList.container.map((todo) => ({
                id: todo.id,
                title: todo.title,
                dueDate: todo.dueDate,
                priority: todo.priority,
                isComplete: todo.isComplete(),
                projectID: todo.projectID,
                todoListID: todo.todoListID,
            })),
        })),
    };
}


export function deSerializeProject(serializedProject) {
    const newProject = new Project(serializedProject.title);
    newProject.id = serializedProject.id;

    serializedProject.container.forEach((serializedTodoList) => {
        const todoList = new TodoList(
            serializedTodoList.title,
            serializedTodoList.description,
            serializedTodoList.projectID
        );
        todoList.id = serializedTodoList.id;

        serializedTodoList.container.forEach((serializedTodo) => {
            const todo = new Todo(
                serializedTodo.title,
                serializedTodo.dueDate,
                serializedTodo.priority,
                serializedTodo.projectID,
                serializedTodo.todoListID
            );
            todo.id = serializedTodo.id;
            if (serializedTodo.isComplete) {
                todo.toggleComplete(); // Restore completion state
            }
            todoList.addToContainer(todo);
        });

        newProject.addToContainer(todoList);
    });

    return newProject;
}


export class Container{
    #items = [];

    addToContainer(obj){
        this.#items.push(obj);
    }
    removeFromContainer(id){
        let index = this.#items.indexOf(this.#items.filter( (element) => element.id == id)[0]);
        this.#items.splice(index,1);
    }
    get items(){
        return this.#items;
    }
}

export class Project{
    #id;
    #container;
    #title;
    
    constructor(title){
        this.#title = title;
        this.#id = generateId()
        this.#container = new Container;
    }

    get id(){
        return this.#id;
    }
    set id(val){
        this.#id = val;
    }

    get title(){
        return this.#title;
    }
    set title(val){
        this.#title = val;
    }

    addToContainer(obj){
        this.#container.addToContainer(obj)
    }
    removeFromContainer(id){
        this.#container.removeFromContainer(id);
    }
    get container(){
        return this.#container.items;
    }   
}



