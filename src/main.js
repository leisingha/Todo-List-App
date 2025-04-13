//main.js

import { DomController } from "./domController.js"
import { AppController } from "./appController.js";
import './style.css'


localStorage.clear();
localStorage.setItem('currentProjectID', '');
localStorage.setItem('currentTodoListID', '');

const projectDialog = document.querySelector('#projectListDialog');
const todoListDialog = document.querySelector('#todoListDialog')
const todoDialog = document.querySelector('#todoDialog');

const addProjectBtn = document.querySelector('#addProject-btn');
addProjectBtn.addEventListener('click', () =>{
    projectDialog.showModal();
    getProjectInfo()
})
const addTodoBtn = document.querySelector('#addTodo-btn');
addTodoBtn.addEventListener('click', ()=>{
    todoDialog.showModal();

})

function getProjectInfo(){
    const form = document.querySelector('#project-form');

    const btnConfirm = document.querySelector('#project-form #btn-confirm');
    btnConfirm.addEventListener('click', (e) =>{
        const data = new FormData(form);
        const title = data.get('title-input');
        if(title == ''){
            return;
        }
        e.preventDefault()
        generateProject(title);
        projectDialog.close();    
    },{once:true})

    const btnCancel = document.querySelector('#project-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        projectDialog.closest();
    },{once:true})

}


function getTodoListInfo(){
    const form = document.querySelector('#todoList-form');

    const btnConfirm = document.querySelector('#todoList-form #btn-confirm');
    btnConfirm.addEventListener('click', (e)=>{
        
    })

    const btnCancel = document.querySelector('#todoLisrt-form #btn-cancel');
}

function getTodoInfo(){
    const form = document.querySelector('#todo-form');

    const btnConfirm = document.querySelector('#todo-form #btn-confirm');
    btnConfirm.addEventListener('click', (e)=>{
        
    })

    const btnCancel = document.querySelector('#todo-form #btn-cancel');
}

function generateProject(title){
    const project = AppController.createNewProject(title);
    const projectNode = DomController.addProject(project);
    const addProjectBtn = projectNode.querySelector('button');
    addProjectBtn.addEventListener('click', (e)=>{
        todoListDialog.showModal();
    })
}

function generateTodoList(title, desc){
    const todoList = AppController.createNewTodoList(title, desc);
    const todoListNode = DomController.addTodoList(todoList);
    todoListNode.addEventListener('click', (e) =>{

    })
}

function generateTodo(title, priority, dueDate){
    const todo = AppController.createNewTodo(title, priority, dueDate);
    const todoNode = DomController.addTodo(todo);
    todoNode.querySelector('input').addEventListener('click', ()=>{
        todo.toggleComplete();
    })

}
