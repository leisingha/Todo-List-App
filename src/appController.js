//appController.js

import { Project, serializeProject, deSerializeProject } from "./project.js";
import { Todo } from "./todo.js";
import { TodoList } from "./todoList.js";

function populateStorage(project){

    localStorage.setItem(project.id, JSON.stringify(serializeProject(project)));
}

export class AppController{
    
    constructor(){

    }
    
    static createNewProject(title){
        const project = new Project(title);
        populateStorage(project);
        return project;
    }


    static createNewTodoList(title, description){
        const todoList = new TodoList(title, description)
        return todoList;
    }

    static printAllProjects(){
        for (let index = 0; index < localStorage.length; index++){
            let key = localStorage.key(index);
            console.log(deSerializeProject(JSON.parse(localStorage.getItem(key))));
        }
    }
    
    static createNewTodo(title, notes, dueDate, priority){
        const todo = new Todo(title, notes, dueDate, priority);
        return todo;
    }
    
    static addToProject(project, todoList){
        project.addToContainer(todoList);
        populateStorage(project);
    }

    static addToTodolist(todoList, todo){
        todoList.addToContainer(todo);
    }

    static removeProject(project){
        localStorage.removeItem(project.id);
    }

    static removeTodoList(project,id){
        project.removeFromContainer(id);
    }

    static removeTodo(todoList, id){
        todoList.removeFromContainer(id);
    }

}   

