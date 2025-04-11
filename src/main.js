//main.js

import { DomController } from "./domController.js"
import { AppController } from "./appController.js";
import './style.css'


localStorage.clear();

DomController.renderProjectListForm();
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


DomController.renderTodoListForm()
DomController.renderTodoForm();

