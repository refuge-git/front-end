import "../css/Dashboards.css";
import IconGreen from "../assets/Avatars-verde.png";
import IconPcGreen from "../assets/icon-pc.png";
import IconRedCad from "../assets/Icon-red-cad.png";

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
      {/* Gráfico de linhas */}
      <div className="dashboard-grafico">
        <h2 className="dashboard-grafico-title">Atendimentos no Mês (2025)</h2>
        <svg width="90%" height="320" viewBox="0 0 700 320">
          {/* Eixos */}
          <line x1="50" y1="20" x2="50" y2="300" stroke="#ccc" />
          <line x1="50" y1="300" x2="650" y2="300" stroke="#ccc" />
          {/* Linhas horizontais */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1="50" y1={70 * i + 30} x2="650" y2={70 * i + 30} stroke="#eee" />
          ))}
          {/* Pontos e linhas */}
          <polyline
            fill="none"
            stroke="#800000"
            strokeWidth="2"
            points="100,80 200,260 300,250 400,170 500,60 600,170"
          />
          {/* Pontos */}
          {[{ x: 100, y: 80 }, { x: 200, y: 260 }, { x: 300, y: 250 }, { x: 400, y: 170 }, { x: 500, y: 60 }, { x: 600, y: 170 }].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="8" fill="#fff" stroke="#800000" strokeWidth="2" />
          ))}
          {/* Labels dos meses */}
          {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((m, i) => (
            <text key={i} x={100 + i * 100} y={320} fontSize="18" textAnchor="middle" fill="#888">{m}</text>
          ))}
          {/* Labels dos valores */}
          {[1000, 750, 500, 250, 0].map((v, i) => (
            <text key={i} x={30} y={70 * i + 35} fontSize="16" textAnchor="end" fill="#888">{v}</text>
          ))}
        </svg>
      </div>
      {/* Gráfico de barras */}
      <div className="dashboard-grafico dashboard-grafico-bar">
        <h2 className="dashboard-grafico-title">Serviços no Mês (2025)</h2>
        {/* Legenda */}
        <div className="dashboard-legenda">
          <div><span className="dashboard-legenda-dot dashboard-legenda-banho"></span> Banho</div>
          <div><span className="dashboard-legenda-dot dashboard-legenda-refeicao"></span> Refeição</div>
          <div><span className="dashboard-legenda-dot dashboard-legenda-outros"></span> Outros</div>
        </div>
        <svg width="90%" height="320" viewBox="0 0 700 320">
          {/* Eixos */}
          <line x1="50" y1="20" x2="50" y2="300" stroke="#ccc" />
          <line x1="50" y1="300" x2="650" y2="300" stroke="#ccc" />
          {/* Linhas horizontais */}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1="50" y1={70 * i + 30} x2="650" y2={70 * i + 30} stroke="#eee" />
          ))}
          {/* Barras */}
          {[
            { banho: 620, refeicao: 520, outros: 180 },
            { banho: 20, refeicao: 800, outros: 740 },
            { banho: 900, refeicao: 420, outros: 120 },
            { banho: 340, refeicao: 750, outros: 280 },
            { banho: 90, refeicao: 770, outros: 160 },
            { banho: 120, refeicao: 210, outros: 900 }
          ].map((mes, i) => {
            const x = 100 + i * 100;
            return (
              <g key={i}>
                <rect x={x - 30} y={300 - mes.banho * 0.28} width="20" height={mes.banho * 0.28} fill="#800000" />
                <rect x={x} y={300 - mes.refeicao * 0.28} width="20" height={mes.refeicao * 0.28} fill="#111" />
                <rect x={x + 22} y={300 - mes.outros * 0.28} width="20" height={mes.outros * 0.28} fill="#ffffe0" stroke="#eee" />
              </g>
            );
          })}
          {/* Labels dos meses */}
          {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((m, i) => (
            <text key={i} x={100 + i * 100 + 10} y={320} fontSize="18" textAnchor="middle" fill="#888">{m}</text>
          ))}
          {/* Labels dos valores */}
          {[1000, 750, 500, 250, 0].map((v, i) => (
            <text key={i} x={30} y={70 * i + 35} fontSize="16" textAnchor="end" fill="#888">{v}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}