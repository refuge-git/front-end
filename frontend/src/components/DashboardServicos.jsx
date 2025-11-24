import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../provider/api";

import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

// REGISTRO NECESSÁRIO PARA GRÁFICO DE BARRAS
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardServicos() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api.get("/registros-atendimentos/relatorios/atendimentos-semana")
      .then((res) => setDados(res.data))
      .catch(console.error);
  }, []);

  const meses = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const mesesPort = {
    Jan: 'Jan', Feb: 'Fev', Mar: 'Mar', Apr: 'Abr', May: 'Mai',
    Jun: 'Jun', Jul: 'Jul', Aug: 'Ago', Sep: 'Set', Oct: 'Out',
    Nov: 'Nov', Dec: 'Dez',
  };

  const datasets = [
    {
      label: "Banhos",
      data: meses.map((m) => dados.find((i) => i.label === m)?.quantidadeBanhos || 0),
      backgroundColor: "#141515",
    },
    {
      label: "Refeições",
      data: meses.map((m) => dados.find((i) => i.label === m)?.quantidadeRefeicoes || 0),
      backgroundColor: "#A52A2A",
    },
    {
      label: "Outros",
      data: meses.map((m) => dados.find((i) => i.label === m)?.quantidadeOutros || 0),
      backgroundColor: "#d4dac6",
    },
  ];

  return (
    <div className="dashboard-grafico-bar">
      <h2 className="dashboard-grafico-title " style={{ color: 'black' }}>Serviços no Mês (2025)</h2>

      <div style={{width: "90%", height: "360px", margin: "0 auto" }}>
        <Bar
          data={{
            labels: meses.map((m) => mesesPort[m]),
            datasets,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
              legend: { position: "top" } },
            scales: { 
              y: { 
              title: {
                display: true,
                text: 'Quantidade de Serviços',
                color: 'black',
                font: { size: 16
            },
          } 
        } 
      },
          }}
        />
      </div>
    </div>
  );
}
