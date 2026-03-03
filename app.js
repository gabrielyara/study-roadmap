require('dotenv').config();
console.log('MONGO_URI carregada:', process.env.MONGO_URI || 'NÃO ENCONTRADA!');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const roadmapRoutes = require('./routes/roadmap');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);

app.get('/', (req, res) => res.send('API Roadmap Tech 2026 rodando!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});