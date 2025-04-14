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
    getTodoInfo()
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
        projectDialog.close();
    },{once:true})

}


function getTodoListInfo(projectID){
    const form = document.querySelector('#todoList-form');

    const btnConfirm = document.querySelector('#todoList-form #btn-confirm');
    btnConfirm.addEventListener('click', (e)=>{
        const data = new FormData(form);
        const title = data.get('title-input');
        const desc = data.get('desc-input');
        if(title == ''){
            return;
        }
        e.preventDefault()
        generateTodoList(projectID, title, desc)
        todoListDialog.close();
    }, {once:true})

    const btnCancel = document.querySelector('#todoList-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        todoListDialog.close();
    },{once:true})
}

function getTodoInfo(){
    const form = document.querySelector('#todo-form');
    const todoListID = document.querySelector('.content h2').dataset.id;
    const projectID = document.querySelector('.content h2').dataset.id;

    const btnConfirm = document.querySelector('#todo-form #btn-confirm');
    btnConfirm.addEventListener('click', (e)=>{
        const data = new FormData(form);
        const title = data.get('text-input');
        const date = data.get('date-input');
        const priority = data.get('priority-input');
        if(title == ''){
            return;
        }
        e.preventDefault()
        generateTodo(todoListID, title, date, priority)
        todoDialog.close();
        
    }, {once:true})

    const btnCancel = document.querySelector('#todo-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        todoDialog.close();
    },{once:true})
}

function generateProject(title){
    const project = AppController.createNewProject(title);
    const projectNode = DomController.addProject(project);
    const addProjectBtn = projectNode.querySelector('button');
    addProjectBtn.addEventListener('click', (e)=>{
        todoListDialog.showModal();
        getTodoListInfo(project.id);
    })
}

function generateTodoList(projectID, title, desc){
    const todoList = AppController.createNewTodoList(title, desc);
    AppController.addToProject(projectID, todoList);
    const todoListNode = DomController.addTodoList(projectID,todoList);
    todoListNode.addEventListener('click', (e) =>{
        DomController.populateMainPage(projectID,todoList);
        console.log('...is executing!')
    },);
}


function generateTodo(todoListID, title, priority, dueDate){
    const todo = AppController.createNewTodo(title, priority, dueDate);
    AppController.addToTodolist(todoListID,todo);
    const todoNode = DomController.addTodo(todo);
    todoNode.querySelector('input').addEventListener('click', ()=>{
        todo.toggleComplete();
    }, {once:true});
}
