const express = require('express');

const fs = require('fs');

const cors = require('cors');
const { title } = require('process');

// Inicializa o servidor Express

const app = express();
const PORT = 3000;

// configuração o Middleware

app.use(cors());
app.use(express.json());

// caminho do arquivo de dados

const FILE_PATH = "./tasks.json";

// Função para ler o arquivo de dados

function readTasks() {
    if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "[]");
    return JSON.parse(fs.readFileSync(FILE_PATH));
}

function writeTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

// Defineção de rotas
app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

app.get("/tasks/:id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id == req.params.id);
    task ?res.json(task) : res.status(404).json({ message: "Task not found" });
});

app.post("/tasks", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description || "",
        completed: false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});



