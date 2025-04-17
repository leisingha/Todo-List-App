//domController.js

export class DomController{
    constructor(){

    }
    static #projectList = document.querySelector('.project-list');
    static #todoItems = document.querySelector('.todos');
    

    static addProject(projectObj){
        const project = document.createElement('li');
        
        const todoList = document.createElement('ul');
        
        const flexContainer = document.createElement('div');
        flexContainer.classList.add('flexContainer');
        
        const titleContainer = document.createElement('div');
        titleContainer.textContent = projectObj.title;
        titleContainer.classList.add('titleContainer')

        const addtodoListBtn = document.createElement('button');
        addtodoListBtn.textContent = '➕';
        addtodoListBtn.id = 'addProjectList-btn';
        addtodoListBtn.classList.add('add-btn-inline');
        addtodoListBtn.dataset.id = projectObj.id;

        const container = document.createElement('div');
        container.classList.add('dropdown');

        const renameBtn = document.createElement('button');
        renameBtn.id = 'renameBtn';
        renameBtn.textContent = '🖊️';
        renameBtn.classList.add('add-btn-inline')

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '🗑️'
        removeBtn.id = 'removeBtn';
        removeBtn.classList.add('add-btn-inline')

        project.dataset.id = projectObj.id;

        flexContainer.appendChild(titleContainer);
        flexContainer.appendChild(addtodoListBtn);
        flexContainer.appendChild(renameBtn);
        flexContainer.appendChild(removeBtn);

        project.append(flexContainer);
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
        const listItemContainer = document.createElement('li');
        todoList.textContent = todoListObj.title;
        todoList.dataset.todoListID = todoListObj.id;
        todoList.dataset.desc = todoListObj.description;
        todoList.dataset.projectID = projectID;

        const projectItems = this.#projectList.querySelectorAll('li');
        projectItems.forEach((item) => {
            if(item.dataset.id == projectID){
                listItemContainer.appendChild(todoList);
                item.querySelector('ul').appendChild(listItemContainer);
                item.querySelector('ul').classList.add('styledList')
            }
        })
        return todoList;

    }

    static renameTodoList(node, text){
        node.textContent = text;
    }

    static removeTodolist(todoListID){
        const todoListButton = Array.from(document.querySelectorAll('.styledList button')).find(button => button.dataset.todoListID === todoListID);
        todoListButton.remove()
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
        priority.classList.add('priorityDiv');

        switch (todoObj.priority){
            case 'Low':
                priority.style.backgroundColor = '#434343';
                break;
            case 'Medium':
                console.log('It runs!');
                priority.style.backgroundColor = '#012213';
                break;
            case 'High':
                priority.style.backgroundColor = '#341601'
                break;
            default:
                break;
        }

        const dueDate = document.createElement('div');
        dueDate.textContent = todoObj.dueDate;
        dueDate.classList.add('dueDateDiv');
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('add-btn-inline');

        todoNode.appendChild(checkbox);
        todoNode.appendChild(title);
        todoNode.appendChild(priority);
        todoNode.appendChild(dueDate);
        todoNode.appendChild(deleteBtn);

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

    static populateMainPage(projectID ,todoListObj, initialize = false){
        const heading = document.querySelector('.banner h2');
        heading.textContent = todoListObj.title;
        heading.dataset.todoListID = todoListObj.id;
        heading.dataset.projectID = projectID;
        const deleteBtn = document.querySelector('.banner #deleteBtn');
        deleteBtn.disabled = false;

        if (initialize){
            deleteBtn.disabled = true;
        }

        const description = document.querySelector('.content p');
        description.textContent = todoListObj.description;

        this.#todoItems.innerHTML = '';
        
        todoListObj.container.forEach( todo => {
            this.#todoItems.appendChild(this.addTodo(todo));
        })
    }

    static toggleStrikeThrough(todoID){
        const todo = Array.from(document.querySelectorAll('.todos li')).find(item => item.dataset.id == todoID);
        console.log(todo);
        todo.querySelector('div:first-of-type').classList.toggle('strikeThrough');
        
    }
}