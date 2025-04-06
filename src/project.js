//project.js

export function generateId(){
    return crypto.randomUUID();
}

export function serializeProject(project){
    return {
        title: project.title,
        id: project.id,
        container: project.container
    }
}

export function deSerializeProject(project){
    const newProject = new Project(project.title)
    project.container.forEach(element => {
        newProject.addToContainer(element);
    });
    newProject.id = project.id;
    return newProject;
    
}

export class Container{
    #items = [];

    addToContainer(obj){
        this.#items.push(obj);
    }
    removeFromContainer(id){
        let index = this.#items.indexOf(this.#items.filter( (element) => element.id == id)[0]);
        this.#items.splice(index,1);
    }
    get items(){
        return this.#items;
    }
}

export class Project{
    #id;
    #container;
    #title;
    
    constructor(title){
        this.#title = title;
        this.#id = generateId()
        this.#container = new Container;
    }

    get id(){
        return this.#id;
    }
    set id(val){
        this.#id = val;
    }

    get title(){
        return this.#title;
    }
    set title(val){
        this.#title = val;
    }

    addToContainer(obj){
        this.#container.addToContainer(obj)
    }
    removeFromContainer(id){
        this.#container.removeFromContainer(id);
    }
    get container(){
        return this.#container.items;
    }   
}



