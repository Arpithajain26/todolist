document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addTaskbutton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  // Add Task
  addTaskbutton.addEventListener("click", () => {
    const taskText = todoinput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoinput.value = "";
  });

  // Render a task
  function renderTask(task) {
    const li = document.createElement("li");

    // Task text span (so delete button stays aligned)
    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    // Toggle complete on text click
    span.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      li.classList.toggle("completed");
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggling complete
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
