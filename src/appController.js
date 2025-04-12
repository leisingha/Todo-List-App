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
    
    static addToProject(projectId, todoList) {
        const serializedProject = localStorage.getItem(projectId);
        if (!serializedProject) {
            console.error('Project not found in localStorage.');
            return;
        }

        const project = deSerializeProject(JSON.parse(serializedProject));
        project.addToContainer(todoList);
        populateStorage(project); // Update the project in localStorage
    }

    static addToTodolist(todoListId, todo) {
        const todoList = JSON.parse(localStorage.getItem(todoListId));
        if (!todoList) {
            console.error('TodoList not found in localStorage.');
            return;
        }

        todoList.addToContainer(todo);

        const projectKey = todoList.projectId; // Assuming todoList has a reference to its parent project
        const serializedProject = localStorage.getItem(projectKey);
        if (!serializedProject) {
            console.error('Parent project not found in localStorage.');
            return;
        }

        const project = deSerializeProject(JSON.parse(serializedProject));
        project.todoLists = project.todoLists.map((list) =>
            list.id === todoList.id ? todoList : list
        );
        populateStorage(project); // Update the project in localStorage
    }

    static removeProject(projectId) {
        localStorage.removeItem(projectId); // Remove the project from localStorage
    }

    static removeTodoList(projectId, todoListId) {
        const serializedProject = localStorage.getItem(projectId);
        if (!serializedProject) {
            console.error('Project not found in localStorage.');
            return;
        }

        const project = deSerializeProject(JSON.parse(serializedProject));
        project.removeFromContainer(todoListId);
        populateStorage(project); // Update the project in localStorage
    }

    static removeTodo(todoListId, todoId) {
        const todoList = JSON.parse(localStorage.getItem(todoListId));
        if (!todoList) {
            console.error('TodoList not found in localStorage.');
            return;
        }

        todoList.removeFromContainer(todoId);

        const projectKey = todoList.projectId; // Assuming todoList has a reference to its parent project
        const serializedProject = localStorage.getItem(projectKey);
        if (!serializedProject) {
            console.error('Parent project not found in localStorage.');
            return;
        }

        const project = deSerializeProject(JSON.parse(serializedProject));
        project.todoLists = project.todoLists.map((list) =>
            list.id === todoList.id ? todoList : list
        );
        populateStorage(project); // Update the project in localStorage
    }
}

