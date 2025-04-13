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
        return project;
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
        return todoList;

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
        const todoNode = document.createElement('li');
        todoNode.dataset.id = todoObj.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const title = document.createElement('div');
        title.textContent = todoObj.title;
        const priority = document.createElement('div');
        priority.textContent = todoObj.priority;
        const dueDate = document.createElement('div');
        dueDate.textContent = todoObj.dueDate;

        todoNode.appendChild(checkbox);
        todoNode.appendChild(title);
        todoNode.appendChild(priority);
        todoNode.appendChild(dueDate);

        this.#todoItems.appendChild(todoNode);

        return todoNode;
        
    }

    static removeTodo(todoID){
        const todoItems = this.#todoItems.querySelectorAll('li');
        todoItems.forEach((item) =>{
            if(item.dataset.id == todoID){
                this.#todoItems.removeChild(item);
            }
        })
    }

    static populateMainPage(todoListObj){
        const heading = document.querySelector('.content h2');
        heading.textContent = todoListObj.title;
        heading.dataset.id = todoListObj.id;

        const description = document.querySelector('.content p');
        description.textContent = todoListObj.description;

        this.#todoItems.innerHTML = '';
        
        todoListObj.container.forEach( todo => {
            this.addTodo(todo);
        })
    }
}