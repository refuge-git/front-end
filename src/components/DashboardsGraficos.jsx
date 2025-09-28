import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function DashboardGraficos() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartInstance = useRef(null);
  const barChartInstance = useRef(null);

  const [viewMode, setViewMode] = useState("mes");

  // Função que destrói o gráfico atual para recriar quando mudar o modo
  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };

  // Função que cria o gráfico de atendimentos conforme o modo selecionado
  const createChart = (mode) => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    if (mode === "mes") {
      labels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      data = Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000));
    } else if (mode === "semana") {
      labels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
      data = [450, 700, 320, 800, 950, 600, 400];
    } else if (mode === "dia") {
      labels = ["6h", "8h", "10h", "12h", "14h", "16h", "18h", "20h"];
      data = [120, 300, 450, 800, 600, 500, 350, 200];
    }

    lineChartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Atendimentos",
            data,
            borderColor: "#800000",
            backgroundColor: "#800000",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#800000",
            pointBorderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { color: "#eee" },
            ticks: { color: "#888", font: { size: 14 } },
          },
          y: {
            beginAtZero: true,
            grid: { color: "#eee" },
            ticks: { stepSize: 250, color: "#888", font: { size: 14 } },
          },
        },
      },
    });
  };

  // Atualiza o gráfico quando o modo muda
  useEffect(() => {
    destroyChart();
    createChart(viewMode);
  }, [viewMode]);

  // Cria o gráfico de barras uma única vez
  useEffect(() => {
    if (barChartInstance.current) barChartInstance.current.destroy();

    const dadosServicos = [
      { banho: 620, refeicao: 520, outros: 180 },
      { banho: 20, refeicao: 800, outros: 740 },
      { banho: 900, refeicao: 420, outros: 120 },
      { banho: 340, refeicao: 750, outros: 280 },
      { banho: 90, refeicao: 770, outros: 160 },
      { banho: 120, refeicao: 210, outros: 900 },
    ];

    barChartInstance.current = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Banho",
            data: dadosServicos.map((d) => d.banho),
            backgroundColor: "#800000",
          },
          {
            label: "Refeição",
            data: dadosServicos.map((d) => d.refeicao),
            backgroundColor: "#111",
          },
          {
            label: "Outros",
            data: dadosServicos.map((d) => d.outros),
            backgroundColor: "#ffffe0",
            borderColor: "#eee",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { color: "#555" } },
        },
        scales: {
          x: {
            grid: { color: "#eee" },
            ticks: { color: "#888", font: { size: 14 } },
          },
          y: {
            beginAtZero: true,
            max: 1000,
            grid: { color: "#eee" },
            ticks: { stepSize: 250, color: "#888", font: { size: 14 } },
          },
        },
      },
    });

    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, []);

  return (
    <>
      {/* DASHBOARD DE ATENDIMENTOS */}
      <div className="dashboard-grafico" style={{ position: "relative" }}>
        <h2 className="dashboard-grafico-title">Atendimentos</h2>

        {/* Select no canto superior direito */}
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="mes">Mês</option>
          <option value="semana">Semana</option>
          <option value="dia">Dia</option>
        </select>

        <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
          <canvas ref={lineChartRef}></canvas>
        </div>
      </div>

      {/* DASHBOARD DE SERVIÇOS */}
      <div className="dashboard-grafico dashboard-grafico-bar">
        <h2 className="dashboard-grafico-title">Serviços no Mês (2025)</h2>
        <div className="dashboard-legenda">
          <div>
            <span className="dashboard-legenda-dot dashboard-legenda-banho"></span>{" "}
            Banho
          </div>
          <div>
            <span className="dashboard-legenda-dot dashboard-legenda-refeicao"></span>{" "}
            Refeição
          </div>
          <div>
            <span className="dashboard-legenda-dot dashboard-legenda-outros"></span>{" "}
            Outros
          </div>
        </div>
        <div style={{ width: "90%", height: "320px", margin: "0 auto" }}>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
    </>
  );
}
