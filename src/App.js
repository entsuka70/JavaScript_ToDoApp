console.log("App.js: loaded");

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
    constructor() {
        console.log("App initialized");
        this.todoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        const containerElement = document.getElementById("js-todo-list");
        const todoItemCountElement = document.getElementById("js-todo-count");
        
        this.todoListModel.onChange(() => {
            const todoListElement = element`<ul />`;
            const todoItems = this.todoListModel.getTodoItems();
            todoItems.forEach(item => {
                const todoItemElement = item.completed
                    ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></input></li>`
                    : element`<li><input type="checkbox" class="checkbox">${item.title}</input></li>`;
                
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", () => {
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                todoListElement.appendChild(todoItemElement);
            });
            render(todoListElement, containerElement);
            todoItemCountElement.textContent = `Todo アイテム数: ${this.todoListModel.getTotalCount()}`;
        });
        
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this.todoListModel.addTodo(new TodoItemModel ({
                title: inputElement.value,
                completed: false
            }));
            inputElement.value = "";
            console.log(`入力欄の値： ${inputElement.value}`)
        });

    }
}