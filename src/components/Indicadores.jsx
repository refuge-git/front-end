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
import "../css/Dashboards.css";
import IconGreen from "../assets/Avatars-verde.png";
import IconPcGreen from "../assets/icon-pc.png";
import IconRedCad from "../assets/Icon-red-cad.png";
import iconAtv from "../assets/icon-atv.png";

export default function Dashboards() {
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
      <span className="dashboard-card-value">180</span>
    </div>

    {/* Linha separadora */}
    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados (média):  </span>
      <span className="dashboard-card-value">120</span>
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
      <span className="dashboard-card-label">Atividade mais requisitada</span>
      <span className="dashboard-card-value">Refeição</span>
    </div>

    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados:</span>
      <span className="dashboard-card-value">120</span>
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
      <span className="dashboard-card-label">Atividade mais requisitada</span>
      <span className="dashboard-card-value">Banho</span>
    </div>

    <div className="dashboard-card-divider"></div>

    <div className="dashboard-card-block">
      <span className="dashboard-card-label">Atendimentos esperados:</span>
      <span className="dashboard-card-value">110</span>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
