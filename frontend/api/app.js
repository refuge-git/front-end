import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import atendimentosRoutes from "./routes/atendimentosRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api/atendimentos", atendimentosRoutes);

// Rota raiz para teste
app.get("/", (req, res) => {
  res.send("API Refuge rodando!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
