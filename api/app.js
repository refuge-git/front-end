import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import atendimentosRoutes from "./routes/atendimentosRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/atendimentos", atendimentosRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
