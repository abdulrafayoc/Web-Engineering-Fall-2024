document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between p-2 mt-2 border-b border-gray-200 rounded-md transition-colors";
      if (task.completed) {
        li.classList.add("line-through");
        li.classList.add("bg-gray-100");
        //change icon o fill
        li.innerHTML = `
                <span><i class="fas fa-check-square fa-lg px-4"></i>${task.text}</span>
                <button class="delete-btn ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"><i class="fas fa-trash fa-lg "></i></button>
            `;
      } else {
        li.innerHTML = `
    <span><i class="far fa-check-square fa-lg  px-4"></i>${task.text}</span>
    <button class="delete-btn ml-2 p-1 text-red-500 hover:text-red-700 transition-colors"><i class="fas fa-trash fa-lg "></i></button>
    `;
      }

      if (task.completed) {
        li.classList.add("completed");
      }

      // Toggle completion
      li.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        }
      });

      // Delete task
      li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push({
        text: taskText,
        completed: false,
      });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  }

  // Event Listeners
  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  // Initial render
  renderTasks();
});
