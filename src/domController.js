//domController.js


export class DomController{
    constructor(){

    }
    static #projectList = document.querySelector('.project-list');
    static #todoItems = document.querySelector('.todos');
    

    static addProject(projectObj){
        const project = document.createElement('li');
        const todoList = document.createElement('ul');

        project.textContent = projectObj.title;
        project.dataset.id = projectObj.id;

        project.appendChild(todoList);
        this.#projectList.appendChild(project);
    }

    static removeProject(projectObj){
        const projectItems = this.#projectList.querySelectorAll('li');
        projectItems.forEach((item) => {
            if(item.dataset.id == projectObj.id){
                this.#projectList.removeChild(item);
            }
        })
    }

    static renameObject(obj, title){
        obj.textContent = title;
    }

    static addTodoList(projectObj, todoListObj){
        const todoList = document.createElement('li');
        todoList.textContent = todoListObj.title;
        todoList.dataset.id = todoListObj.id;

        const projectItems = this.#projectList.querySelectorAll('li');
        projectItems.forEach((item) => {
            if(item.dataset.id == projectObj.id){
                item.appendChild(todoList);
            }
        })

    }

    static removeTodolist(projectObj, todoListObj){
        const projectItems = this.#projectList.querySelectorAll('li');

        projectItems.forEach((item) =>{
            if(item.dataset.id == projectObj.id){
                const todoLists = item.querySelectorAll('li');
                todoLists.forEach(todoList => {
                    if(todoList.dataset.id == todoListObj.id){
                        item.removeChild(todoList);
                    }
                }) 
            }
        })
    }

    static addTodo(todoObj){
        const todo = document.createElement('li');
        const date = document.createElement('div');
        const priority = document.createElement('div');

        todo.textContent = todoObj.title;
        date.textContent = todoObj.date;
        priority.textContent = todoObj.priority;

        todo.appendChild(date);
        todo.appendChild(priority);
        this.#todoItems.append(todo);

        
    }

    static removeTodo(todoObj){
        const todoItems = this.#todoItems.querySelectorAll('li')
        todoItems.forEach((item) =>{
            if(item.dataset.id == todoObj.id){
                this.#todoItems.removeChild(item);
            }
        })
    }

    static renderProjectListForm(){
        const addBtn = document.querySelector('#addProject-btn');
        const dialog = document.querySelector('#projectListDialog');
        addBtn.addEventListener('click', ()=>{
            dialog.showModal();
        })
    }

    static renderTodoListForm(){
        const addBtn = document.querySelector('#addProjectList-btn');
        const dialog = document.querySelector('#todoListDialog'); 
        
        addBtn.addEventListener('click', ()=>{
            dialog.showModal();
        })
        
    }

    static renderTodoForm(){
        const addBtn = document.querySelector('#addTodo-btn');
        const dialog = document.querySelector('#todoDialog');
        addBtn.addEventListener('click', ()=> {
            dialog.showModal();
        })
    }


}