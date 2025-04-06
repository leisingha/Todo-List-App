//todoList.js

import { generateId, Container } from "./project.js";

export class TodoList{
    #id = null;
    #title;
    #description;
    #container;

    constructor(title, description){
        this.title = title;
        this.description = description;
        this.#container = new Container;
        this.#id = generateId();
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
        this.#title = text;
    }

    addToContainer(obj){
        this.#container.addToContainer(obj);
    }
    removeFromContainer(id){
        this.#container.removeFromContainer(id);
    }
    get container(){
        return this.#container.items();
    }
}
