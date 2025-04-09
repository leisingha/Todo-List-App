//domController.js


class DomController{
    constructor(){

    }

    static addProject(obj){
        const project = document.createElement('li')
        project.textContent = obj.title;
        project.dataset.id = obj.id;
    }

    static removeProject(id){
        const projectList = document.querySelector('.project-list')
        const projectItems = document.querySelectorAll('.project-list li');
        projectItems.forEach((item) => {
            if(item.dataset.id == id){
                projectList.removeChild(item);
            }
        })
    }

    static renameObject(obj, title){
        obj.textContent = title;
    }

    static addTodoList(obj){
        const todoList = document.createElement(li);
        todoList.textContent = obj.title;
        todoList.dataset.id = obj.id;
    }

    static removeTodolist(){
        const todoList = document.querySelector('.todo-list');
        const todoListItems = document.querySelectorAll('todo-list li');
        todoListItems.forEach((item) =>{
            if(item.dataset.id == id){
                todoList.removeChild(item);
            }
        })
    }

    static addTodo(obj){
        const todo = document.createElement('li')
        todo.textContent = obj.title;
        project.dataset.id = obj.id;
    }

    static updateTodo(obj, attr){
        const todoListItems = document.querySelectorAll('.todos li');
        const property = document.querySelector(`.todos li #${attr}`)
        todoListItems.forEach((item) =>{
            if(item.dataset.id == obj.id){
                property.textContent = obj[attr];
            }
        })
    }

    static removeTodo(){

    }

    static renderTodoForm(){
        const form = document.createElement('form');
        const heading = document.createElement('h1');
        const input = document.createElement('input');
        const label = document.createElement('label');
    }

    static
}