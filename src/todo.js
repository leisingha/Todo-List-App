//todo.js

import { generateId } from "./project.js";

export class Todo {
    #id;
    #isComplete = false;
    #title;
    #dueDate;
    #priority;
    #projectID;
    #todoListID;

    constructor (title,dueDate, priority, projectID, todoListID){
        this.#title = title;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#projectID = projectID;
        this.#todoListID = todoListID;
        this.#id = generateId(); 
    }
    get id(){
        return this.#id;
    }

    get projectID(){
        return this.#projectID;
    }

    get todoListID(){
        return this.#todoListID;
    }

    get title(){
        return this.#title;
    }
    set title(val){
        this.#title = val;
    }

    get dueDate(){
        return this.#dueDate;
    }
    set dueDate(date){
        this.#dueDate = date;
    }

    get priority(){
        return this.#priority;
    }
    set priority(val){
        this.#priority = val;
    }

    toggleComplete(){
        this.#isComplete = !(this.#isComplete);
        return this.#isComplete;
    }
    isComplete(){
        return this.#isComplete;
    }

}




