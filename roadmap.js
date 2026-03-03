const express = require('express');
const Roadmap = require('../models/Roadmap');
const auth = require('../middleware/auth');

const router = express.Router();

const availableAreas = [
  'Full-Stack Web Development',
  'AI & Machine Learning',
  'Data Science & Analytics',
  'DevOps & Cloud Engineering',
  'Cybersecurity'
];

const predefinedRoadmaps = {
  'Full-Stack Web Development': [
    { id: 1, title: 'HTML, CSS & JavaScript Avançado', description: 'Fundamentos modernos + TypeScript', duration: '4-6 semanas' },
    { id: 2, title: 'React/Next.js 15+', description: 'Componentes, hooks, SSR, App Router', duration: '6-8 semanas' },
    { id: 3, title: 'Node.js + Express/TypeScript', description: 'APIs REST/GraphQL, autenticação JWT', duration: '4-6 semanas' },
    { id: 4, title: 'Banco de Dados (PostgreSQL/MongoDB)', description: 'Modelagem, ORM (Prisma/Drizzle)', duration: '3-4 semanas' },
    { id: 5, title: 'DevOps básico + Deploy', description: 'Docker, CI/CD, Vercel/AWS', duration: '4 semanas' }
  ],
  'AI & Machine Learning': [
    { id: 1, title: 'Python + Bibliotecas científicas', description: 'NumPy, Pandas, Matplotlib', duration: '4 semanas' },
    { id: 2, title: 'Fundamentos de ML', description: 'Scikit-learn, regressão, classificação', duration: '6 semanas' },
    { id: 3, title: 'Deep Learning', description: 'PyTorch/TensorFlow, CNNs, Transformers', duration: '8-10 semanas' },
    { id: 4, title: 'LLMs & Generative AI', description: 'LangChain, RAG, fine-tuning', duration: '6 semanas' },
    { id: 5, title: 'MLOps & Deploy', description: 'MLflow, FastAPI, cloud endpoints', duration: '4 semanas' }
  ],
  'Data Science & Analytics': [
    { id: 1, title: 'SQL Avançado + Python', duration: '4 semanas' },
  ],
  'DevOps & Cloud Engineering': [
    { id: 1, title: 'Linux & Networking', duration: '3 semanas' },
  ],
  'Cybersecurity': [
    { id: 1, title: 'Fundamentos de Segurança', duration: '4 semanas' },
  ]
};

router.get('/:area', auth, async (req, res) => {
  const { area } = req.params;
  if (!availableAreas.includes(area)) {
    return res.status(400).json({ error: `Área inválida. Disponíveis: ${availableAreas.join(', ')}` });
  }

  try {
    let roadmap = await Roadmap.findOne({ user: req.user.id, area });

    if (!roadmap) {
      const steps = predefinedRoadmaps[area].map(step => ({ ...step, progress: 0 }));
      roadmap = new Roadmap({
        user: req.user.id,
        area,
        steps,
        overallProgress: 0
      });
      await roadmap.save();
    }

    const total = roadmap.steps.length;
    const completed = roadmap.steps.filter(s => s.progress === 100).length;
    roadmap.overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
    await roadmap.save();

    res.json({
      area: roadmap.area,
      steps: roadmap.steps,
      overallProgress: roadmap.overallProgress + '%',
      lastUpdated: roadmap.lastUpdated
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar roadmap' });
  }
});

router.put('/:area/:stepId', auth, async (req, res) => {
  const { area, stepId } = req.params;
  const { progress } = req.body; // 0-100

  if (progress < 0 || progress > 100 || !Number.isInteger(progress)) {
    return res.status(400).json({ error: 'Progresso deve ser inteiro entre 0 e 100' });
  }

  try {
    const roadmap = await Roadmap.findOne({ user: req.user.id, area });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado' });

    const step = roadmap.steps.find(s => s.id === Number(stepId));
    if (!step) return res.status(404).json({ error: 'Etapa não encontrada' });

    step.progress = progress;
    roadmap.lastUpdated = new Date();

    const total = roadmap.steps.length;
    const completed = roadmap.steps.filter(s => s.progress === 100).length;
    roadmap.overallProgress = total > 0 ? Math.round((completed / total) * 100) : 0;

    await roadmap.save();

    res.json({
      message: 'Progresso atualizado',
      steps: roadmap.steps,
      overallProgress: roadmap.overallProgress + '%'
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar progresso' });
  }
});

module.exports = router;