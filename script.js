const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
    <span onclick="toggleTask(${index})"
          style="cursor:pointer; text-decoration:${task.completed ? 'line-through' : 'none'};">
        ${task.text}
    </span>
    <button onclick="deleteTask(${index})">❌</button>
`;
        taskList.appendChild(li);
    });
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") return;

    tasks.push({
    text: task,
    completed: false
});
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
