import React, { useEffect, useState, useRef } from "react";
import api from "../provider/api";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function DashboardAtendimentos() {
  const lineChartRef = useRef(null);
  const lineChartInstance = useRef(null);

  const [viewMode, setViewMode] = useState("dia");
  const [selectedDate, setSelectedDate] = useState("");

  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };

  const createChart = async (mode) => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    try {
      let response;

      if (mode === "mes") {
        response = await api.get("/registros-atendimentos/relatorios/atendimentos-mes");

      } else if (mode === "semana") {
        response = await api.get("/registros-atendimentos/semana");

      } else if (mode === "dia") {
        response = await api.get("/registros-atendimentos/dia");
      }

      const registros = response.data;

      if (mode === "mes") {
        labels = registros.map(item => item.diaMes);
        data = registros.map(item => item.quantidadeAtendimentos);

      } else if (mode === "semana") {
        const ordem = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        registros.sort((a, b) =>
          ordem.indexOf(a.dia_semana ?? a.diaSemana) -
          ordem.indexOf(b.dia_semana ?? b.diaSemana)
        );

        labels = registros.map(item => {
          const d = item.dia_semana ?? item.diaSemana;
          const map = { Mon: "Seg", Tue: "Ter", Wed: "Qua", Thu: "Qui", Fri: "Sex", Sat: "Sáb", Sun: "Dom" };
          return map[d] || d;
        });

        data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimentos);

      } else if (mode === "dia") {
        labels = registros.map(item => item.hora);
        data = registros.map(item => item.quantidade_atendimentos ?? item.quantidadeAtendimento);
      }

    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }

    destroyChart();

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
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantidade de Atendimentos",
              color: "black",     // opcional
              font: { size: 16 }, // opcional
            },
          }
        }
      },

    });
  };

  useEffect(() => {
    createChart(viewMode);
    return destroyChart;
  }, [viewMode]);

  useEffect(() => {
    if (viewMode !== "dia") return;
    const interval = setInterval(() => createChart("dia"), 30000);
    return () => clearInterval(interval);
  }, [viewMode]);

  return (
    <div className="dashboard-grafico">
      <h2 className="dashboard-grafico-title " style={{ color: 'black' }}>Atendimentos</h2>

      {(viewMode === "semana" || viewMode === "mes") && (
        <div style={{ position: "absolute", top: 10, right: 230 }}>
          {viewMode === "semana" && (
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          )}
          {viewMode === "mes" && (
            <input type="month" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          )}
        </div>
      )}

      <select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value)}
        style={{
          position: "absolute",
          width: "200px",
          top: "10px",
          right: "20px",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="dia">Dia</option>
        <option value="semana">Semana</option>
        <option value="mes">Mês</option>
      </select>

      <div style={{ width: "90%", height: 320, margin: "0 auto" }}>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
}

