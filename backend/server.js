const express = require('express');

const fs = require('fs');

const cors = require('cors');

// Inicializa o servidor Express

const app = express();
const PORT = 3000;

// configuração o Middleware

app.use(cors());
app.use(express.json());