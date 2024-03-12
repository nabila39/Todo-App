// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".add");
const deleteButton = document.getElementById("clearAll");

// Add event listeners
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

const addTask =()=>{
  const newTask = todoInput.value.trim()                ;
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

const displayTasks =()=> {
 
  while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
  }


  todo.forEach((item, index) => {
 
      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-container");


      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("todo-checkbox");
      checkbox.id = `input-${index}`;
      if (item.disabled) {
          checkbox.checked = true;
      }
      checkbox.addEventListener("change", () => clickTask(index));
      const todoText = document.createElement("p");
      todoText.id = `todo-${index}`;
      todoText.classList.add("todo-text");
      if (item.disabled) {
          todoText.classList.add("disabled");
      }
      todoText.textContent = item.text;
      todoText.addEventListener("click", () => editTask(index));
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => removeTask(index));
      todoContainer.appendChild(checkbox);
      todoContainer.appendChild(todoText);
      const todoButtons = document.createElement("div");
      todoButtons.classList.add("todo-buttons");
      todoButtons.appendChild(deleteButton);
      todoContainer.appendChild(todoButtons);
      todoList.appendChild(todoContainer);
  });
  todoCount.textContent = todo.length;
}

const editTask=(index) =>{
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");
  inputElement.classList.add("edit-input");
  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

const clickTask=(index) =>{
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}
const removeTask=(index)=> {
    todo.splice(index, 1); 
    saveToLocalStorage();
    displayTasks();
  }
  
const deleteAllTasks=()=> {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

const saveToLocalStorage=()=> {
  localStorage.setItem("todo", JSON.stringify(todo));
}
