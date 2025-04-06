//appController.js

import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { TodoList } from "./todoList.js";

export class AppController{
    static #storage = []
    
    constructor(){

    }
    
    static createNewProject(title){
        const project = new Project(title);
        this.#storage.push(project)
        return project;
    }


    static createNewTodoList(title, description){
        const todoList = new TodoList(title, description)
        return todoList;
    }

    static printAllProjects(){
        this.#storage.forEach(element => console.log(element));
    }
    
    static createNewTodo(title, notes, dueDate, priority){
        const todo = new Todo(title, notes, dueDate, priority);
        return todo;
    }
    
    static addToProject(project, todoList){
        project.addToContainer(todoList);
    }

    static addToTodolist(todoList, todo){
        todoList.addToContainer(todo);
    }

    static removeProject(project){
        this.#storage.pop(project);
    }

    static removeTodoList(project,id){
        project.removeFromContainer(id);
    }

    static removeTodo(todoList, id){
        todoList.removeFromContainer(id);
    }

}   

