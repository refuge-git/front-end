import express from "express";
import {
	getAtendimentosDia,
	getAtendimentosSemana,
	getAtendimentosMes,
    getServicosMes,
} from "../controllers/atendimentosController.js";

const router = express.Router();

// Rotas que retornam atendimentos por período
router.get("/dia", getAtendimentosDia);
router.get("/semana", getAtendimentosSemana);
router.get("/mes", getAtendimentosMes);

router.get("/servicosmes", getServicosMes);

export default router;

