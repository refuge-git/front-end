import express from "express";
import {
	getAtendimentosDia,
	getAtendimentosSemana,
	getAtendimentosMes,
} from "../controllers/atendimentosController.js";

const router = express.Router();

// Rotas que retornam atendimentos por período
router.get("/dia", getAtendimentosDia);
router.get("/semana", getAtendimentosSemana);
router.get("/mes", getAtendimentosMes);

export default router;

