//domController.js

export class DomController{
    constructor(){

    }
    static #projectList = document.querySelector('.project-list');
    static #todoItems = document.querySelector('.todos');
    

    static addProject(projectObj){
        const project = document.createElement('li');
        const todoList = document.createElement('ul');

        const addtodoListBtn = document.createElement('button');
        addtodoListBtn.textContent = '+';
        addtodoListBtn.id = 'addProjectList-btn';
        addtodoListBtn.classList.add('add-btn-inline');
        addtodoListBtn.dataset.id = projectObj.id;

        project.textContent = projectObj.title;
        project.dataset.id = projectObj.id;

        project.appendChild(addtodoListBtn);
        project.appendChild(todoList);
        this.#projectList.appendChild(project);
        return addtodoListBtn;
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

    static addTodoList(projectID, todoListObj){
        const todoList = document.createElement('button');
        todoList.textContent = todoListObj.title;
        todoList.dataset.id = todoListObj.id;
        todoList.dataset.desc = todoListObj.description;
        todoList.dataset.projectID = projectID;

        const projectItems = this.#projectList.querySelectorAll('li');
        projectItems.forEach((item) => {
            if(item.dataset.id == projectID){
                item.appendChild(todoList);
            }
        })
        return ;

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


}