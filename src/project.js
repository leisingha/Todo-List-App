//project.js

class Project{
    #id = null;
    #todoLists = [];
    
    constructor(title){
        this.title = title;
    }

    get id(){
        return this.#id;
    }
    set id(val){
        this.#id = val;
    }

    addTodoList(obj){
        this.#todoLists.push(obj);
    }
    removeTodoList(id){
        let index = this.#todoLists.indexOf(this.#todoLists.filter( (todoList) => todoList.id == id)[0]);
        this.#todoLists.splice(index,1);
    }
    get todoLists(){
        return this.#todoLists;
    }
}
