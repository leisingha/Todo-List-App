//todo.js

class Todo {
    #id = null;
    #isComplete = false;
    #title;
    #notes;
    #dueDate;
    #priority;

    constructor (title, notes, dueDate, priority){
        this.title = title;
        this.notes = notes;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title(){
        return this.#title;
    }
    set title(val){
        this.#title = val;
    }

    get notes(){
        return this.#notes;
    }
    set notes(text){
        this.#notes = text;
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
    get isComplete(){
        return this.#isComplete;
    }

    set id(val){
        this.#id = val;
    }
    get id(){
        return this.#id;
    }

}



