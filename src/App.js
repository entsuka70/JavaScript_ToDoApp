console.log("App.js: loaded");

import { element } from "./view/html-util.js";

export class App {
    constructor() {
        console.log("App initialized");
    }
    mount() {
        const formElement = document.getElementById("js-form");
        const inputElement = document.getElementById("js-form-input");
        const containerElement = document.getElementById("js-todo-list");
        const todoItemCountElement = document.getElementById("js-todo-count");
        let todoItemCount = 0;
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const todoItemElement = element`<li>${inputElement.value}</li>`;
            containerElement.appendChild(todoItemElement);
            todoItemCount += 1;
            todoItemCountElement.textContent = `ToDoアイテム数: ${todoItemCount}`;
            inputElement.value = "";
            console.log(`入力欄の値： ${inputElement.value}`)
        });

    }
}