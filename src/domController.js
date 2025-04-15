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

        const container = document.createElement('div');
        container.classList.add('dropdown');

        const dropDownBtn = document.createElement('button');
        dropDownBtn.classList.add('dropdown-button');
        dropDownBtn.textContent = '⋮';

        const dropDownOptions = document.createElement('div');
        dropDownOptions.classList.add('dropdown-menu');

        const renameBtn = document.createElement('button');
        renameBtn.id = 'renameBtn';
        renameBtn.textContent = 'Edit';

        const removeBtn = document.createElement('button');
        removeBtn.id = 'removeBtn';
        removeBtn.textContent = 'Delete';

        project.textContent = projectObj.title;
        project.dataset.id = projectObj.id;

        dropDownOptions.appendChild(renameBtn);
        dropDownOptions.appendChild(removeBtn);

        container.appendChild(dropDownBtn);
        container.appendChild(dropDownOptions);

        project.appendChild(addtodoListBtn);
        project.appendChild(container);
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

    static renameObject(node, newName){
        const textNode = Array.from(node.childNodes).find(child => child.nodeType === Node.TEXT_NODE);
        if (textNode) {
            textNode.nodeValue = newName; // Update only the text content
        }
    }

    static addTodoList(projectID, todoListObj){
        const todoList = document.createElement('button');
        todoList.textContent = todoListObj.title;
        todoList.dataset.todoListid = todoListObj.id;
        todoList.dataset.desc = todoListObj.description;
        todoList.dataset.projectID = projectID;

        const projectItems = this.#projectList.querySelectorAll('li');
        projectItems.forEach((item) => {
            if(item.dataset.id == projectID){
                item.querySelector('ul').appendChild(todoList);
                item.querySelector('ul').classList.add('styledList')
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
        checkbox.checked = todoObj.isComplete();

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

    static populateMainPage(projectID ,todoListObj){
        const heading = document.querySelector('.content h2');
        heading.textContent = todoListObj.title;
        heading.dataset.todoListID = todoListObj.id;
        heading.dataset.projectID = projectID;

        const description = document.querySelector('.content p');
        description.textContent = todoListObj.description;

        this.#todoItems.innerHTML = '';
        
        todoListObj.container.forEach( todo => {
            this.#todoItems.appendChild(this.addTodo(todo));
        })
    }
}