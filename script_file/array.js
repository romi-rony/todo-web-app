// let todos = [];
// const add = document.getElementById("addBtn");

// add.addEventListener('click', (e) => {
//   let input = document.getElementById("todoInput").value;

//   let todo = {
    
//     text: input,
//     completed: false
//   };

//   todos.push(todo);
//   console.log(todos);
  
// });

let todoArr = [];
let counter = 1;

const taskInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

addBtn.addEventListener("click", (e) => {
  let taskText = taskInput.value;  

  if (taskInput.value === "") {
    alert("Task cannot be empty.")
    return;
  }

  let todo = {
    id: counter++,
    task : taskText,
    completed: false
  }

  todoArr.push(todo);
  console.table(todoArr);
  displayTodo();

  taskInput.value = "";
})

taskInput.addEventListener("keydown", (g) => {
  if (g.key === "Enter") {
    addBtn.click();
  }
}) 


function displayTodo() {
  list.innerHTML = "";

  todoArr.forEach(todo => {
    const li = document.createElement("li");
    li.className = `list-group-item`;
    li.dataset.id = todo.id;

    li.innerHTML = `<input type="checkbox" class="form-check-input me-2 todo-check" ${todo.completed ? "checked" : ""}><span class=${todo.completed ? "text-decoration-line-through" : ""}>${todo.task}</span><button class="deleteBtn btn btn-sm text-danger fw-bold float-end">X</button>`;
    list.appendChild(li);
    
  });
}


list.addEventListener("click", (f) => {

  const li = f.target.closest("li");
  if(!li) return;

  const id = Number(li.dataset.id);
  
  if (f.target.classList.contains("todo-check")) {
    const todo = todoArr.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    console.table(todoArr);
    displayTodo();
  } 

  if (f.target.classList.contains("deleteBtn")) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      todoArr = todoArr.filter(todo => todo.id !== id);
      console.table(todoArr);
      displayTodo();
    }
  }
})



