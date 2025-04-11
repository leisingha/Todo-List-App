//main.js

import { DomController } from "./domController.js"
import { AppController } from "./appController.js";
import './style.css'


localStorage.clear();


function handleProject(){
    const confirmProjectBtn = document.querySelector('#project-form #btn-confirm');
    const cancelProjectBtn = document.querySelector('#project-form #btn-cancel')
    const projectForm = document.querySelector('#project-form');
    const dialog = document.querySelector('#projectListDialog');
    
    
    confirmProjectBtn.addEventListener('click',(e)=>{
        if(!projectForm.checkValidity()){
            return;
        }
        e.preventDefault()
        const data = new FormData(projectForm);
        const newProject = AppController.createNewProject(data.get('title-input'));
        console.log(newProject);
        dialog.close()
    })
    
    cancelProjectBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        dialog.close()
    })
}

renderProjectListForm();

function handleTodoList(element){
    const confirmTodoListBtn = document.querySelector('#todoList-form #btn-confirm');
    const cancelTodoListBtn = document.querySelector('#todoList-form #btn-cancel');
    const todoListForm = document.querySelector('#todoList-form');
    const dialog = document.querySelector('#todoListDialog');
    // const project = localStorage.key(element.parentElement.dataset.id);
    const project = AppController.createNewProject('Gay');


    confirmTodoListBtn.addEventListener('click', (e) =>{
        if(!todoListForm.checkValidity()){
            return;
        }
        e.preventDefault();
        const data = new FormData(todoListForm);
        const todoList = AppController.createNewTodoList(data.get('title-input'), data.get('desc-input'));
        AppController.addToProject(project, todoList);
        dialog.close();
    })

    cancelTodoListBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        dialog.close()
    })
}
renderTodoListForm();

function TodoTitleDescGenerator(){
    const button = document.querySelector('li ul button');
    button.addEventListener('click', (e)=>{
        const todoListID = e.target.dataset.id;
        const todoListTitle = e.target.textContent;
        const todoListDesc = e.target.dataset.desc;

        const heading = document.querySelector('.content h2');
        const desc = document.querySelector('.content p');

        localStorage.getItem(e.target.parentElement.dataset.id)

        heading.textContent = todoListTitle;
        heading.dataset.id = todoListID;
        desc.textContent = todoListDesc;
    })
}

TodoTitleDescGenerator();

function handleTodo(element){
    const confirmTodoBtn = document.querySelector('#todo-form #btn-confirm');
    const cancelTodoBtn = document.querySelector('#todo-form #btn-cancel');
    const todoForm = document.querySelector('#todo-form');
    const dialog = document.querySelector('#todoDialog');
    const todoList = element.parentElement;
    
}

function renderProjectListForm(){
    const addBtn = document.querySelector('#addProject-btn');
    const dialog = document.querySelector('#projectListDialog');
    addBtn.addEventListener('click', ()=>{
        dialog.showModal();
        handleProject();
    })
}

function renderTodoListForm(){
    const addBtn = document.querySelector('#addProjectList-btn');
    const dialog = document.querySelector('#todoListDialog'); 
    
    addBtn.addEventListener('click', (e)=>{
        dialog.showModal();
        handleTodoList(e.target)
    })
    
}

function renderTodoForm(){
    const addBtn = document.querySelector('#addTodo-btn');
    const dialog = document.querySelector('#todoDialog');
    addBtn.addEventListener('click', (e)=> {
        dialog.showModal();
        handleTodo(e.target);
    })
}

renderTodoForm();

