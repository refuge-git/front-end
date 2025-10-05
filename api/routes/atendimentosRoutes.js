import express from "express";
import { listarAtendimentos, criarAtendimento } from "../controllers/atendimentosController.js";

const router = express.Router();

router.get("/", listarAtendimentos);
router.post("/", criarAtendimento);

export default router;
