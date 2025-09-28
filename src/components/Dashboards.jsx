import "../css/Dashboards.css";
import IconGreen from "../assets/Avatars-verde.png";
import IconPcGreen from "../assets/icon-pc.png";
import IconRedCad from "../assets/Icon-red-cad.png";
import DashboardGraficos from "./DashboardsGraficos";

export default function Dashboards() {
  return (
    <div className="dashboards-root">
      {/* Cards de indicadores */}
      <div className="dashboards-indicadores">
        {/* Indicador 1 */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-green">
            {/* <span className="dashboard-indicador-emoji">👥</span> */}
            <img src={IconGreen} alt="Ícone Pessoas" className="dashboard-indicador-img" />
          </div>
          <div>
            <div className="dashboard-indicador-label">Pessoas atendidas no mês atual</div>
            <div className="dashboard-indicador-value">980</div>
            <div className="dashboard-indicador-up">▲ 51,4% este mês</div>
          </div>
        </div>
        {/* Indicador 2 */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-red">
            {/* <span className="dashboard-indicador-emoji">🧑‍💼</span> */}
            <img src={IconRedCad} alt="Ícone Pessoas" className="dashboard-indicador-img" />
          </div>
          <div>
            <div className="dashboard-indicador-label">Novos cadastros no mês atual</div>
            <div className="dashboard-indicador-value">400</div>
            <div className="dashboard-indicador-down">▼ 15% este mês</div>
          </div>
        </div>
        {/* Indicador 3 */}
        <div className="dashboard-indicador">
          <div className="dashboard-indicador-icon dashboard-indicador-bg-green">
            {/* <span className="dashboard-indicador-emoji ">🖥️</span> */}
            <img src={IconPcGreen} alt="Ícone Pessoas" className="dashboard-indicador-img" />
          </div>
          <div>
            <div className="dashboard-indicador-label">Atividade mais requisitada no mês atual</div>
            <div className="dashboard-indicador-value dashboard-indicador-activity">Refeição</div>
            <div className="dashboard-indicador-up" style={{ visibility: 'hidden' }}>Placeholder</div>
          </div>
        </div>
      </div>
      {/* Gráficos */}
      <DashboardGraficos />
    </div>
  );
}