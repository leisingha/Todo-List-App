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
    
    static createNewTodo(title, notes, dueDate, priority){
        const todo = new Todo(title, notes, dueDate, priority);
        return todo;
    }
    
    static addToProject(project, todoList){
        project.addTodoList(todoList);
    }

    static addToTodolist(todoList, todo){
        todoList.addTodo(todo);
    }

    static removeProject(project){
        this.#storage.pop(project);
    }

    static removeTodoList(project,todoList){
        project.removeTodoList(todoList);
    }

    static removeTodo(todoList, todo){
        todoList.removeTodo(todo);
    }

}   

