//appController.js

import { Project, serializeProject, deSerializeProject } from "./project.js";
import { Todo } from "./todo.js";
import { TodoList } from "./todoList.js";

function populateStorage(project){

    localStorage.setItem(project.id, JSON.stringify(serializeProject(project)));
  
}

function getCurrentProject(projectID){
    const serializedProject = localStorage.getItem(projectID);
        if (!serializedProject) {
            console.error('Project not found in localStorage.');
            return;
        }

        return deSerializeProject(JSON.parse(serializedProject));
}

export class AppController{
    
    static createNewProject(title){
        const project = new Project(title);
        populateStorage(project);
        return project;
    }

    static removeProject(projectId) {
        localStorage.removeItem(projectId); 
    }

    static renameProject(projectID, newName) {
        const project = getCurrentProject(projectID); // Retrieve the project
        if (!project) {
            console.error('Project not found. Cannot rename.');
            return;
        }
        project.title = newName; // Update the project's name
        populateStorage(project); // Save the updated project back to localStorage
    }

    static printAllProjects(){
        for (let index = 0; index < localStorage.length; index++){
            let key = localStorage.key(index);
            console.log(deSerializeProject(JSON.parse(localStorage.getItem(key))));
        }
    }

    static createNewTodoList(title, description){
        const todoList = new TodoList(title, description)
        return todoList;
    }
    
    static addToProject(projectID, todoList) {
        const project = getCurrentProject(projectID);
        project.addToContainer(todoList);
        populateStorage(project);
    }

    static removeTodoList(projectId, todoListId) {
        const project = getCurrentProject(projectId);
        project.removeFromContainer(todoListId);
        populateStorage(project); // Update the project in localStorage
    }

    static createNewTodo(title, notes, dueDate, priority){
        const todo = new Todo(title, notes, dueDate, priority);
        return todo;
    }

    static addToTodolist(todoListID, todo) {
        const projectID = document.querySelector('.content h2').dataset.projectID;
        const project = getCurrentProject(projectID)
        const todoLists = project.container;
        console.log(project)
        todoLists.forEach(todoList => {
            if(todoList.id == todoListID){
                todoList.addToContainer(todo);
            }
        })
        populateStorage(project);
    }

    static removeTodo(todoListId, todoId) {
        const projectID = localStorage.getItem('currentProjectID');
        const project = getCurrentProject(projectID)
        const todoLists = project.container;
        todoLists.forEach(todoList => {
            if(todoList.id == todoListId){
                todoList.removeFromContainer(todoId);
            }
        })
        populateStorage(project);

    }
}

