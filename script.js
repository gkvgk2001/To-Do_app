// jscode

//variables

const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-btn"),
  taskBox = document.querySelector(".task-box");

let editId;

let isEditableTask = false;

//getting local storage from todo -list
let todos = JSON.parse(localStorage.getItem("todo-list"));

//step 7

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");

    btn.classList.add("active");

    showToDoList(btn.id);
  });
});

//step2

function showToDoList(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      let iscompleted = todo.status == "completed" ? "checked" : "";

      if (filter == todo.status || filter == "all") {
        liTag += `

          <li class="task">
            <label for="${id}">

              <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${iscompleted}>

              <p class = "${iscompleted}">${todo.name}</p>

            </label>

            <div class="setting">
              <i onclick = "showMenu(this)" class="uil uil-ellipsis-h"></i>

              <ul   class="task-menu">
                <li onclick = 'editTask(${id} , "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                <li onclick = 'deleteTask(${id} , "${filter}")'><i class="uil uil-trash"></i>Delete</li>
              </ul>
            </div>
          </li>
        
        
        
        
        
        `;
      }
    });
  }

  taskBox.innerHTML = liTag || `<span> You don't have any task here </span>`;
}

showToDoList("all");

//step 4

function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;

  menuDiv.classList.add("show");

  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

//step 6

function editTask(taskId, taskName) {
  editId = taskId;

  isEditableTask = true;

  taskInput.value = taskName;
}

//step 5;

function deleteTask(deleteId, filter) {
  //removing selcted task from aaray

  todos.splice(deleteId, 1);

  localStorage.setItem("todo-list", JSON.stringify(todos));

  showToDoList(filter);
}

//step 3

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;

  if (selectedTask.checked) {
    taskName.classList.add("checked"); ///this is used to underline the completd task
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");

    todos[selectedTask.id].status = "pending";
  }

  localStorage.setItem("todo-list", JSON.stringify(todos));
}

//step7

clearAll.addEventListener("click", () => {
  todos.splice(0, todos.length); //removing all item in a array

  localStorage.setItem("todo-list", JSON.stringify(todos));

  showToDoList("all");
});

//step 1

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  //   console.log(userTask);

  if (e.key == "Enter" && userTask) {
    //if todos isn't exist , pass an empty array to todos

    //to have multiple entires in string
    if (!isEditableTask) {
      //if editable task isn't true
      if (!todos) {
        todos = [];
      }

      let taskInfo = { name: userTask, status: "pending" };

      todos.push(taskInfo); //adding new task to todos
    } else {
      isEditableTask = false;
      todos[editId].name = userTask;
    }
    //it is use as whenever we press enter the curent written string disaapears from input box
    taskInput.value = "";

    //without json it cannot read a todos list

    localStorage.setItem("todo-list", JSON.stringify(todos));

    showToDoList("all");
  }
});
