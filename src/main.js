//main.js

import { AppController } from "./appController.js";

const proj = AppController.createNewProject('Default');
AppController.printAllProjects();



const todoList = AppController.createNewTodoList('To do List', 'Regular Description');
AppController.addToProject(proj,todoList);

const todo = AppController.createNewTodo('example 1', 'Just Notes', '12/12/25', 'low'); 
AppController.addToTodolist(todoList, todo);

todo.toggleComplete();
console.log(todo.isComplete())

AppController.removeTodo(todoList, todo);
AppController.removeTodoList(proj, todoList);
AppController.removeProject(proj);