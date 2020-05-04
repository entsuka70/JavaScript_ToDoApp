console.log("App.js: loaded");

import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor() {
        this.todoListModel = new TodoListModel();
    }
    mount() {
        const formElement = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        const containerElement = document.getElementById("js-todo-list");
        const todoItemCountElement = document.getElementById("js-todo-count");
        
        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoListView = new TodoListView();
            const todoListElement = todoListView.createElement(todoItems, {
                onUpdateTodo: ({ id, completed }) => {
                    this.todoListModel.updateTodo({ id, completed });
                },
                onDeleteTodo: ({ id }) => {
                    this.todoListModel.deleteTodo({ id });
                }
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