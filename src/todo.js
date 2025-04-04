//todo.js

class Todo {
    #id;
    #isComplete;
    
    constructor (title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get title(){
        return this.title;
    }
    set newTitle(val){
        this.title = val;
    }

    get description(){
        return this.description;
    }
    set newDescription(text){
        this.description = text;
    }

    get dueDate(){
        return this.dueDate;
    }
    set dueDate(date){
        this.dueDate = date;
    }

    get priority(){
        return this.priority;
    }
    set newPriority(val){
        this.priority = val;
    }
}