const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
let editingTaskId = null;

taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;

    if (editingTaskId) {
        // Update existing task
        const response = await fetch(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: taskName,
                task_description: taskDescription,
                completed: false // Set to false as default
            }),
        });
        const updatedTask = await response.json();
        const taskDiv = document.querySelector(`#task-${editingTaskId}`);
        taskDiv.querySelector(".task-name").innerText = updatedTask.task_name;
        taskDiv.querySelector(".task-description").innerText = updatedTask.task_description;

        editingTaskId = null; // Reset editing task ID
    } else {
        // Create new task
        const response = await fetch("http://127.0.0.1:8000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                task_name: taskName,
                task_description: taskDescription,
                completed: false // Set to false as default
            }),
        });
        const newTask = await response.json();
        displayTask(newTask);
    }

    // Clear the form fields
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
});

function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.id = `task-${task.task_id}`;
    taskDiv.className = "bg-white p-4 rounded-lg shadow-md mb-4 transition-transform duration-200";
    taskDiv.innerHTML = `
        <h3 class="task-name text-lg font-bold">${task.task_name}</h3>
        <p class="task-description text-gray-600">${task.task_description}</p>
        <p class="text-sm text-gray-500">Created At: ${new Date(task.created_at).toLocaleString()}</p>
        <p class="text-sm text-gray-500">Updated At: ${new Date(task.updated_at).toLocaleString()}</p>
        <div class="flex justify-between mt-4">
            <button onclick="editTask(${task.task_id}, '${task.task_name}', '${task.task_description}')" class="bg-yellow-500 text-white font-semibold p-2 rounded-md hover:bg-yellow-600">Edit</button>
            <button onclick="deleteTask(${task.task_id})" class="bg-red-500 text-white font-semibold p-2 rounded-md hover:bg-red-600">Delete</button>
        </div>
    `;
    taskList.appendChild(taskDiv);
}

async function deleteTask(taskId) {
    await fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "DELETE",
    });
    const taskDiv = document.querySelector(`#task-${taskId}`);
    taskList.removeChild(taskDiv);
}

function editTask(taskId, taskName, taskDescription) {
    // Set the form fields with the existing task data
    document.getElementById("taskName").value = taskName;
    document.getElementById("taskDescription").value = taskDescription;
    editingTaskId = taskId; // Store the task ID being edited
}

// Load tasks on page load
window.onload = async () => {
    const response = await fetch("http://127.0.0.1:8000/tasks/");
    const tasks = await response.json();
    tasks.forEach(displayTask);
};
