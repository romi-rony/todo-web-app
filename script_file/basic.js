const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");

addBtn.addEventListener("click", (e) => {  
  if (input.value === "") {
    alert("Please enter task")
    return;
  }

  const li = document.createElement("li");
  li.className = "list-group-item"
  li.innerHTML = `<input type="checkbox" class="form-check-input me-2 todo-check"><span >${input.value}</span><button class="deleteBtn btn btn-sm text-danger fw-bold float-end">X</button>`;

  list.appendChild(li);
  input.value="";
})

list.addEventListener("click", (f) => {
  if (f.target.classList.contains("todo-check")) {
    f.target.parentElement.classList.toggle("text-success");
  } 

  if (f.target.classList.contains("deleteBtn")) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      f.target.parentElement.remove();
    }
  }
  
})



