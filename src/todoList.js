//todoList.js

export class TodoList{
    #id = null;
    #todos = []
    #title;
    #description;

    constructor(title, description){
        this.title = title;
        this.description = description;
    }

    set id(num){
        this.#id = num;
    }
    get id(){
        return this.#id;
    }

    set description(text){
        this.#description = text;
    }
    get description(){
        return this.#description;
    }

    get title(){
        return this.#title;
    }
    set title(text){
        return this.#title;
    }

    addTodo(obj){
        this.#todos.push(obj);
    }
    removeTodo(id){
        let index = this.#todos.indexOf(this.#todos.filter((todo) => todo.id == id)[0])
        this.#todos.splice(index,1)
    }
    get todos(){
        return this.#todos
    }
}
