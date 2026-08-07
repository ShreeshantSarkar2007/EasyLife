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
            ${task}
            <button onclick="deleteTask(${index})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") return;

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
