//main.js

import { DomController } from "./domController.js"
import { AppController, getCurrentProject } from "./appController.js";
import './style.css'


if (localStorage.length === 0) {
    generateProject('Default', true);
    generateTodoList(getCurrentProject(localStorage.key(0)).id, 'Add your Title here! 😺', 'Add your description here! 😼', true);
} else {
    restorePreviousState();
}

initializeDefaultPage();

// function restorePreviousState() {
//     // Restore all projects
//     for (let i = 0; i < localStorage.length; i++) {
//         const projectKey = localStorage.key(i);
//         const project = getCurrentProject(projectKey);
//         const projectNode = DomController.addProject(project, false);
        
//         // Restore project event listeners
//         const addProjectBtn = projectNode.querySelector('button');
//         const renameBtn = projectNode.querySelector('#renameBtn');
//         const removeBtn = projectNode.querySelector('#removeBtn');

//         addProjectBtn.addEventListener('click', () => {
//             todoListDialog.showModal();
//             getTodoListInfo(project.id);
//         });

//         renameBtn.addEventListener('click', () => {
//             editProjectDialog.showModal();
//             editProjectInfo(project.id, projectNode);
//         });

//         removeBtn.addEventListener('click', () => {
//             AppController.removeProject(project.id);
//             DomController.removeProject(project);
//         });

//         // Restore todo lists for this project
//         project.container.forEach(todoList => {
//             const todoListNode = DomController.addTodoList(project.id, todoList);
//             // Add event listeners for todo list
//             todoListNode.addEventListener('click', () => {
//                 const updatedTodoList = getCurrentProject(project.id).container
//                     .find(item => item.id === todoList.id);
//                 DomController.populateMainPage(project.id, updatedTodoList, false);
//             });
//         });
//     }
// }

function initializeDefaultPage(){
    const button = document.querySelector('.styledList button')
    button.dispatchEvent(new Event("click"));
}



const projectDialog = document.querySelector('#projectListDialog');
const todoListDialog = document.querySelector('#todoListDialog')
const todoDialog = document.querySelector('#todoDialog');
const editProjectDialog = document.querySelector('#editProjectListDialog');
const editTodoListDialog = document.querySelector('#updateTodoListDialog');

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

const editBtn = document.querySelector('.banner #editBtn');
editBtn.addEventListener('click', (e)=>{
    const projectID = e.target.previousElementSibling.dataset.projectID
    const todoListID = e.target.previousElementSibling.dataset.todoListID;
    editTodoListDialog.showModal();
    getUpdatedTodoInfo(projectID, todoListID);
})

const deleteBtn = document.querySelector('.banner #deleteBtn')
deleteBtn.addEventListener('click', (e)=>{
    const projectID = e.target.previousElementSibling.previousElementSibling.dataset.projectID
    const todoListID = e.target.previousElementSibling.previousElementSibling.dataset.todoListID;
    
    AppController.removeTodoList(projectID, todoListID);
    DomController.removeTodolist(todoListID);
    initializeDefaultPage();
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
        form.reset(); 
    },{once:true})

    const btnCancel = document.querySelector('#project-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        projectDialog.close();
        form.reset(); 
    },{once:true})

}

function editProjectInfo(projectID, node){
    const form = document.querySelector('#renameProject-form');

    const btnConfirm = document.querySelector('#renameProject-form #btn-confirm');
    btnConfirm.addEventListener('click', (e) =>{
        const data = new FormData(form);
        const title = data.get('title-input');
        if(title == ''){
            return;
        }
        e.preventDefault()
        AppController.renameProject(projectID, title);
        DomController.renameObject(node, title);
        editProjectDialog.close(); 
        form.reset();    
    },{once:true})

    const btnCancel = document.querySelector('#renameProject-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        editProjectDialog.close();
        form.reset(); 
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
        form.reset(); 
    }, {once:true})

    const btnCancel = document.querySelector('#todoList-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        todoListDialog.close();
        form.reset(); 
    },{once:true})
}

function getTodoInfo(){
    const form = document.querySelector('#todo-form');
    const todoListID = document.querySelector('.content h2').dataset.todoListID;

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
        generateTodo(todoListID, title, date, priority);
        todoDialog.close();
        form.reset(); 
        
    }, {once:true})

    const btnCancel = document.querySelector('#todo-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        todoDialog.close();
        form.reset(); 
    },{once:true})
}

function generateProject(title, initialize=false){
    const project = AppController.createNewProject(title);
    const projectNode = DomController.addProject(project, initialize);
    const addProjectBtn = projectNode.querySelector('button');
    const renameBtn = projectNode.querySelector('#renameBtn');
    const removeBtn = projectNode.querySelector('#removeBtn');

    addProjectBtn.addEventListener('click', (e)=>{
        todoListDialog.showModal();
        getTodoListInfo(project.id);
    })

    renameBtn.addEventListener('click', (e)=>{
        editProjectDialog.showModal();
        editProjectInfo(project.id, projectNode);
    })

    removeBtn.addEventListener('click', (e)=>{
        AppController.removeProject(project.id);
        DomController.removeProject(project);
    })
}

function generateTodoList(projectID, title, desc, initialize=false){
    const todoList = AppController.createNewTodoList(title, desc);
    AppController.addToProject(projectID, todoList);
    const todoListNode = DomController.addTodoList(projectID,todoList);
    todoListNode.addEventListener('click', (e) =>{
        const updatedTodoList = getCurrentProject(projectID).container.find(item => item.id == todoList.id);
        const todoItems = DomController.populateMainPage(projectID,updatedTodoList, initialize);
        
        todoItems.querySelectorAll('input').forEach(input => {
            input.addEventListener('click', (e) => {
                const todoID = e.target.parentElement.dataset.id; // Get the todo ID from the parent element's dataset
                const todoListID = todoList.id; // Reference the current todoList ID
                const todo = getCurrentProject(projectID).container
                    .find(todoList => todoList.id == todoListID)
                    .container.find(todo => todo.id == todoID); // Find the correct todo object

                if (todo) {
                    todo.toggleComplete(); // Toggle the completion status
                    DomController.toggleStrikeThrough(todoID); // Strike through the todo
                    AppController.updateTodo(todoListID, todo.id); // Update the todo in storage
                } else {
                    console.error('Todo not found!');
                }
            });
        });
        
    });
}

function getUpdatedTodoInfo(projectID, todoListID){
    const form = document.querySelector('#updateTodoList-form');

    const todoListButton = Array.from(document.querySelectorAll('.styledList button')).find(button => button.dataset.todoListID === todoListID);
    const todoListHeader = document.querySelector('.banner h2');
    const todoListDesc = document.querySelector('.content p');

    const btnConfirm = document.querySelector('#updateTodoList-form #btn-confirm');
    btnConfirm.addEventListener('click', (e) =>{
        const data = new FormData(form);
        const title = data.get('title-input');
        const desc = data.get('desc-input');
        if(title == ''){
            return;
        }
        e.preventDefault()
        AppController.updateTodoList(projectID,todoListID,title, desc);
        DomController.renameTodoList(todoListButton, title);
        DomController.renameTodoList(todoListHeader, title);
        DomController.renameTodoList(todoListDesc, desc);
        editTodoListDialog.close(); 
        form.reset();    
    },{once:true})

    const btnCancel = document.querySelector('#updateTodoList-form #btn-cancel');
    btnCancel.addEventListener('click', (e)=>{
        e.preventDefault();
        editTodoListDialog.close();
        form.reset(); 
    },{once:true})
}


function generateTodo(todoListID, title, priority, dueDate){
    const todo = AppController.createNewTodo(title, priority, dueDate);
    AppController.addToTodolist(todoListID,todo);

    const todoNode = DomController.addTodo(todo);
    todoNode.querySelector('input').addEventListener('click', ()=>{
        todo.toggleComplete();
        DomController.toggleStrikeThrough(todo.id);
        AppController.updateTodo(todoListID,todo.id);
    });
    todoNode.querySelector('button').addEventListener('click',()=>{
        AppController.removeTodo(todoListID, todo.id);
        DomController.removeTodo(todo.id);
    })  
}
