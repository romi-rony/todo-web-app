let todoArray = [];
let deletedTodo = [];
let counter = 1;

let isEditing = false;
let editID = null;

const inputTask = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("todoList");
const total = document.getElementById("totalCount");
const completed = document.getElementById("completedTask");
const uncompleted = document.getElementById("uncompletedTask");
const deletedTask = document.getElementById("deletedTask");

// Adding todos
addBtn.addEventListener("click", () => {
  let taskText = inputTask.value.trim();

  if (taskText === "") {
    alert("Task cannot be empty. Please enter some task.");
    return;
  }

  if (isEditing) {
    todoArray = todoArray.map((todo) => {
      if (todo.id === editID) {
        return {
          ...todo,
          task: taskText,
        };
      }
      return todo;
    });
    // todo.id === editID ? {...todo, task:taskText} : todo);
    isEditing = false;
    editID = null;
    addBtn.textContent = "Add";
    inputTask.value = "";

    displayTodo();
    console.log(todoArray);

    return;
  }

  let newtodo = {
    id: counter++,
    task: taskText,
    completed: false,
  };

  todoArray.push(newtodo);
  console.log(todoArray);
  displayTodo();
  updateCount();

  inputTask.value = "";
});

// Removing all todos
clearBtn.addEventListener("click", () => {
  todoArray = [];
  if (isEditing) {
    isEditing = false;
    editID = null;
    addBtn.textContent = "Add";
    inputTask.value = "";
  }
  console.log("All todo has been deleted");
  displayTodo();
});

// Displaying Todos on UI
function displayTodo() {
  list.innerHTML = "";

  todoArray.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.dataset.id = todo.id;

    li.innerHTML = `<input type="checkbox" class="form-check-input me-2 todo-check order-1" ${todo.completed ? "checked" : ""}><span class="order-2 ${todo.completed ? "text-decoration-line-through text-success" : ""}">${todo.task}</span><div class="float-end"><button class="btn text-primary edit-btn sm fw-bold py-0" ${todo.completed ? "disabled" : ""}>Edit
    </button><button class="btn delete-btn text-danger sm fw-bold float-end py-0">Delete</button></div>`;
    list.appendChild(li);
  });
}

// Keeping the count summary
function updateCount() {
  const totalCount = todoArray.length;
  total.textContent = totalCount;

  const completedCount = todoArray.reduce((count, todo) => {
    if (todo.completed === true) {
      return count + 1;
    }
    return count;
  }, 0);
  completed.textContent = completedCount;

  const uncompletedCount = totalCount - completedCount;
  uncompleted.textContent = uncompletedCount;

  deletedTask.textContent = deletedTodo.length;
}

// Adding event listener for completed, delete, edit
list.addEventListener("click", (f) => {
  const li = f.target.closest("li");

  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (f.target.classList.contains("delete-btn")) {
    const todo = todoArray.find((todo) => todo.id === id);
    deletedTodo.push(todo);
    console.log(deletedTodo);

    todoArray = todoArray.filter((todo) => todo.id !== id);

    // const newTodoArray = [];
    // for (let todo of todoArray) {
    //   (todo.id===id) ? deletedTodo.push(todo) : newTodoArray.push(todo);
    // }
    // todoArray = newTodoArray;

    // const newtodoArr = todoArray.reduce((acc, todo) => {
    //   todo.id === id ? deletedTodo.push(todo) : acc.push(todo);
    //   return 
    // }, []);

    // todoArray = newtodoArr;    

    console.log("Deleted todo:", deletedTodo);
    console.log("Todo Array: ", todoArray)
  }

  if (f.target.classList.contains("todo-check")) {
    todoArray = todoArray.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    // const todo = todoArray.find((todo) => todo.id === id);
    // todo.completed = !todo.completed;
    console.log(todoArray);
  }

  if (f.target.classList.contains("edit-btn")) {
    const todo = todoArray.find((todo) => todo.id === id);
    inputTask.value = todo.task;
    editID = todo.id;
    isEditing = true;
    addBtn.textContent = "Update";
    inputTask.focus();
    console.log("ID of editing todo:", id);
    console.log(todo);
  }
  displayTodo();
  updateCount();
});
