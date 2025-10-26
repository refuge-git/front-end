// import "../css/Dashboards.css";
// import IconGreen from "../assets/Avatars-verde.png";
// import IconPcGreen from "../assets/icon-pc.png";
// import IconRedCad from "../assets/Icon-red-cad.png";

// export default function Dashboards() {
//   return (
//     <div className="dashboards-root">
//       {/* Container de indicadores */}
//       <div className="dashboards-cards">
//         {/* Card 1 */}
//         <div className="dashboard-card">
//           <div className="dashboard-card-icon bg-green">
//             <img src={IconGreen} alt="Ícone Pessoas" />
//           </div>
//           <div className="dashboard-card-info">
//             <span className="dashboard-card-label">Pessoas atendidas no mês atual</span>
//             <span className="dashboard-card-value">980</span>
//             <span className="dashboard-card-up">▲ 51,4% este mês</span>
//           </div>
//         </div>

//         {/* Card 2 */}
//         <div className="dashboard-card">
//           <div className="dashboard-card-icon bg-red">
//             <img src={IconRedCad} alt="Ícone Cadastros" />
//           </div>
//           <div className="dashboard-card-info">
//             <span className="dashboard-card-label">Novos cadastros no mês atual</span>
//             <span className="dashboard-card-value">400</span>
//             <span className="dashboard-card-down">▼ 15% este mês</span>
//           </div>
//         </div>

//         {/* Card 3 */}
//         <div className="dashboard-card">
//           <div className="dashboard-card-icon bg-green">
//             <img src={IconPcGreen} alt="Ícone Atividade" />
//           </div>
//           <div className="dashboard-card-info">
//             <span className="dashboard-card-label">Atividade mais requisitada</span>
//             <span className="dashboard-card-value">Refeição</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboards.css";
import IconGreen from "../assets/Avatars-verde.png";
import IconPcGreen from "../assets/icon-pc.png";
import IconRedCad from "../assets/Icon-red-cad.png";
import iconAtv from "../assets/icon-atv.png";

export default function Dashboards() {

    const [indicadores, setIndicadores] = useState(null);

  useEffect(() => {
    const fetchIndicadores = () => {
      console.log("🔄 Buscando indicadores do backend...");

      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/indicadores", {
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
      {/* Container de indicadores */}
      <div className="dashboards-cards">
        {/* Card 1 */}
<div className="dashboard-card">
  <div className="dashboard-card-icon bg-green">
    <img src={IconGreen} alt="Ícone Pessoas" />
  </div>
  <div className="dashboard-card-info dashboard-card-info-horizontal">
    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Pessoas atendidas:</span>
      <span className="dashboard-card-value">{indicadores.atendimentosMesAtual}</span>
    </div>

    {/* Linha separadora */}
    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados (média):  </span>
      <span className="dashboard-card-value">{indicadores.mediaAtendimentosMesAtual}</span>
    </div>
  </div>
</div>


        {/* Card 2 */}
<div className="dashboard-card">
  <div className="dashboard-card-icon bg-green">
    <img src={iconAtv} alt="Ícone Atividade" />
  </div>
  <div className="dashboard-card-info dashboard-card-info-horizontal">
    <div className="dashboard-card-block">
      <span className="dashboard-card-label">1º Atividade mais requisitada</span>
      <span className="dashboard-card-value">{indicadores.atividadeMaisRequisitadaMes}</span>
    </div>

    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados:</span>
      <span className="dashboard-card-value">{indicadores.mediaAtividadeMaisRequisitada.toFixed(0)}</span>
    </div>
  </div>
</div>
    

        {/* Card 3 */}
<div className="dashboard-card">
  <div className="dashboard-card-icon bg-green">
    <img src={iconAtv} alt="Ícone Atividade" />
  </div>
  <div className="dashboard-card-info dashboard-card-info-horizontal">
    <div className="dashboard-card-block">
      <span className="dashboard-card-label">2º Atividade mais requisitada</span>
      <span className="dashboard-card-value">{indicadores.segundaAtividadeMaisRequisitadaMes}</span>
    </div>

    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados:</span>
      <span className="dashboard-card-value">{indicadores.mediaSegundaAtividadeMaisRequisitada.toFixed(0)}</span>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
