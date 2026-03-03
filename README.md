<div align="center">

  <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  
  <h1>📚 Tech Roadmap API</h1>
  <p>
    <strong>API RESTful para gerenciar roadmaps de estudos em tecnologia</strong><br>
    Escolha sua área (Full-Stack, AI/ML, DevOps, etc.), acompanhe progresso e personalize sua jornada de aprendizado!
  </p>

  <p>
    <a href="https://github.com/gabrielyara/study-roadmap/stargazers">
      <img src="https://img.shields.io/github/stars/gabrielyara/study-roadmap?style=social" alt="GitHub stars">
    </a>
    <a href="https://github.com/gabrielyara/study-roadmap/fork">
      <img src="https://img.shields.io/github/forks/gabrielyara/study-roadmap?style=social" alt="GitHub forks">
    </a>
    <a href="https://github.com/gabrielyara/study-roadmap/issues">
      <img src="https://img.shields.io/github/issues/gabrielyara/study-roadmap?style=flat-square" alt="Issues">
    </a>
  </p>

</div>

<br>

## ✨ Funcionalidades

- Autenticação completa com JWT + bcrypt
- Criação automática de roadmap ao acessar pela primeira vez
- Atualização de progresso por etapa (0–100%)
- Cálculo automático de progresso geral (%)
- Áreas de tecnologia atualizadas para 2025/2026:
  - Full-Stack Web Development
  - AI & Machine Learning
  - Data Science & Analytics
  - DevOps & Cloud Engineering
  - Cybersecurity
- Integração com MongoDB (Mongoose)
- Estrutura limpa: MVC + middlewares + rotas separadas
- Pronto para frontend (React, Vue, etc.)

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Banco de Dados**: MongoDB + Mongoose
- **Autenticação**: JWT + bcrypt
- **Variáveis de ambiente**: dotenv
- **CORS** habilitado
- **Validações** e tratamento de erros

## 📋 Endpoints Principais

| Método | Endpoint                              | Descrição                              | Autenticação |
|--------|---------------------------------------|----------------------------------------|--------------|
| POST   | `/api/auth/register`                  | Registrar novo usuário                 | Não          |
| POST   | `/api/auth/login`                     | Fazer login e obter token              | Não          |
| GET    | `/api/roadmap/:area`                  | Obter/iniciar roadmap da área          | Sim (JWT)    |
| PUT    | `/api/roadmap/:area/:stepId`          | Atualizar progresso de uma etapa       | Sim (JWT)    |

Exemplo de body para PUT:
```json
{ "progress": 75 }
```

## 🛠️ Como Rodar Localmente


- **Clone o repositório:**

```clone https://github.com/SEU_USUARIO/roadmap-api.git
cd roadmap-api
```

- **Instale as dependências:**
```
npm install
```

- **Crie o arquivo .env na raiz:**
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/roadmap-db
JWT_SECRET=sua_chave_secreta_muito_forte_aqui
```

- **Inicie o MongoDB (local ou Atlas):**
  - **Rode o servidor**
```
# Modo desenvolvimento (com nodemon)
npm run dev

# Ou modo produção
npm start
```

- **A API estará em: http://localhost:3000**

## 🔧 Testando com Thunder Client / Postman

- **Registre um usuário → POST /api/auth/register**
  - **Faça login → POST /api/auth/login → copie o token**
  - **Acesse roadmap → GET /api/roadmap/Full-Stack%20Web%20Development**
  - **Header: Authorization: Bearer SEU_TOKEN**

## 📈 Roadmap do Projeto (meta)

- **Integração com frontend (React + visualização gráfica)**
  - **Reset de progresso / múltiplos roadmaps por usuário**
  - **Certificados / badges ao completar etapas**
  - **Deploy na Vercel + MongoDB Atlas**
  - **Documentação com Swagger/OpenAPI**

## 🤝 Contribuições
Sinta-se à vontade para abrir issues, pull requests ou sugerir novas áreas de tecnologia!
Fork → Branch → Commit → Pull Request ✨

## 📄 Licença
MIT License – sinta-se livre para usar, modificar e compartilhar!

  Feito com 💻 e ☕ por Gabriel Yara
  
  ⭐ Se gostou, dá uma estrela no repositório!
