import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboards.css";
import IconGreen from "../assets/Avatars-verde.png";
import IconPcGreen from "../assets/icon-pc.png";
import IconRedCad from "../assets/Icon-red-cad.png";
import DashboardGraficos from "./DashboardAtendimentos";
import api from "../provider/api";

export default function Dashboards() {
  const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    const fetchIndicadores = () => {
      console.log("🔄 Buscando indicadores do backend...");

      const token = localStorage.getItem("token");
      api.get("/indicadores", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("✅ Dados recebidos:", response.data);
        setIndicadores(response.data);
        })
        .catch((error) => {
          console.error("❌ Erro ao buscar indicadores:", error);
        });
    };

    fetchIndicadores();
    const interval = setInterval(fetchIndicadores, 180000); // atualiza a cada 3 minutos
    return () => clearInterval(interval);
  }, []);

  if (!indicadores) {
    return <p style={{ textAlign: "center" }}>Carregando indicadores...</p>;
  }

  // ✅ Função para exibir seta e cor dependendo do crescimento
  const renderCrescimento = (valor) => {
    const percentual = Math.abs(valor).toFixed(1) + "% este mês";
    if (valor > 0) {
      return <div className="dashboard-indicador-up">▲ {percentual}</div>;
    } else if (valor < 0) {
      return <div className="dashboard-indicador-down">▼ {percentual}</div>;
    } else {
      return <div className="dashboard-indicador-neutral">– 0% este mês</div>;
    }
  };

  return (
    <div className="dashboards-root">
      {/* Cards de indicadores */}
      <div className="dashboards-indicadores">

        {/* Indicador 1 - Pessoas atendidas */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-green">
            <img
              src={IconGreen}
              alt="Ícone Pessoas"
              className="dashboard-indicador-img"
            />
          </div>
          <div>
            <div className="dashboard-indicador-label">
              Pessoas atendidas no mês atual
            </div>
            <div className="dashboard-indicador-value">
              {indicadores.atendimentosMesAtual}
            </div>
            {renderCrescimento(indicadores.crescimentoAtendimentos)}
          </div>
        </div>

        {/* Indicador 2 - Novos cadastros */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-red">
            <img
              src={IconRedCad}
              alt="Ícone Cadastro"
              className="dashboard-indicador-img"
            />
          </div>
          <div>
            <div className="dashboard-indicador-label">
              Novos cadastros no mês atual
            </div>
            <div className="dashboard-indicador-value">
              {indicadores.novosCadastrosMes}
            </div>
            {renderCrescimento(indicadores.crescimentoNovosCadastros)}
          </div>
        </div>

        {/* Indicador 3 - Atividade mais requisitada */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-green">
            <img
              src={IconPcGreen}
              alt="Ícone Atividade"
              className="dashboard-indicador-img"
            />
          </div>
          <div>
            <div className="dashboard-indicador-label">
              Atividade mais requisitada no mês atual
            </div>
            <div className="dashboard-indicador-value dashboard-indicador-activity">
              {indicadores.atividadeMaisRequisitadaMes}
            </div>
            <div
              className="dashboard-indicador-up"
              style={{ visibility: "hidden" }}
            >
              Placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <DashboardGraficos />
    </div>
  );
}
