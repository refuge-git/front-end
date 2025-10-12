import express from "express";
import { getAtendimentosDia } from "../controllers/atendimentosController.js";

const router = express.Router();

// Rota que retorna os atendimentos do dia atual
router.get("/dia", getAtendimentosDia);

export default router;

