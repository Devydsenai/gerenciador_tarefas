const apiUrl = "http://localhost:3000/task";

const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title, description })
        });

        if (!res.ok) throw new Error("Erro ao adicionar a tarefa");

        const task = await res.json();
        form.reset();
        addTaskToUl(task);
    } catch (err) {
        alert("Erro ao salvar a tarefa: " + err.message);
    }
});

// Função addTaskToUl
function addTaskToUl(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
        <span>${task.title} - ${task.description}</span>
        <div>
            <button onclick="toggleComplete(${task.id}, ${task.completed})">
            ✔️
            </button>
            <button onclick="deleteTask(${task.id})">
            🗑️
            </button>
        </div>
    `;
    taskList.appendChild(li);
    
}

async function loadTask() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Erro ao carregar as tarefas: 😒");

        const tasks = await res.json();
        taskList.innerHTML = ""; // Limpa a lista antes de adicionar as tarefas
        tasks.forEach(addTaskToUl);
    } catch (err) {
        alert("Erro ao carregar as tarefas:🤦‍♂️ " + err.message);
    }
}

async function toggleComplete(id, completed) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: json.stringify({ completed: !completed })
        });
        loadTask();
    } catch (err) {
        alert("Erro ao atualizar a tarefa: 😢 " + err.message);
    }
}


