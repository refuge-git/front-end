import React, { useEffect, useState, useRef } from "react";
import api from "../provider/api";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

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

import "react-datepicker/dist/react-datepicker.css";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDayPicker, setShowDayPicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const createChart = async () => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    try {
      let response;

      /* =======================
         MODO DIA: por HORA
      ========================== */
      if (viewMode === "dia") {
        response = await api.get("/registros-atendimentos/dia", {
          params: { data: formatDate(selectedDate) },
        });

        const registros = Array.isArray(response.data) ? response.data : [];

        registros.sort((a, b) => {
          const [ha] = a.hora.split(":").map(Number);
          const [hb] = b.hora.split(":").map(Number);
          return ha - hb;
        });

        labels = registros.map((r) => r.hora);
        data = registros.map((r) => r.quantidadeAtendimento);

        if (registros.length === 0) {
          labels = ["00:00"];
          data = [0];
        }

      /* =======================
         INTERVALO: por DIA
      ========================== */
      } else if (viewMode === "personalizada" && startDate && endDate) {
        response = await api.get("/registros-atendimentos/intervalo-dia", {
          params: {
            inicio: formatDate(startDate),
            fim: formatDate(endDate),
          },
        });

        const registros = Array.isArray(response.data) ? response.data : [];

        registros.sort((a, b) => new Date(a.dia) - new Date(b.dia));

        labels = registros.map((r) => r.dia);
        data = registros.map((r) => r.quantidadeAtendimentos); 

        if (registros.length === 0) {
          labels = ["Sem dados"];
          data = [0];
        }
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      labels = ["Erro"];
      data = [0];
    }

    destroyChart();

    lineChartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label:
              viewMode === "dia"
                ? "Atendimentos por Hora"
                : "Atendimentos por Dia",
            data,
            borderColor: "#800000",
            backgroundColor: "rgba(128, 0, 0, 0.15)",
            tension: 0.3,
            pointRadius: 3,
            pointHitRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              title: (items) =>
                viewMode === "dia"
                  ? `Hora: ${items[0]?.label ?? ""}`
                  : `Dia: ${items[0]?.label ?? ""}`,
              label: (item) => `Atendimentos: ${item.formattedValue}`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: viewMode === "dia" ? "Hora" : "Dia",
              font: { size: 14 },
            },
          },
          y: {
            title: { display: true, text: "Quantidade", font: { size: 14 } },
            beginAtZero: true,
            ticks: { precision: 0 },
          },
        },
      },
    });
  };

  useEffect(() => {
    createChart();
  }, [viewMode, selectedDate, startDate, endDate]);

  return (
    <div className="dashboard-grafico">

      {/* CONTROLES */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "15px",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {viewMode === "dia" && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDayPicker(!showDayPicker)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#000",
                cursor: "pointer",
              }}
            >
              <Calendar size={18} color="#000" />
              {selectedDate.toLocaleDateString("pt-BR")}
            </button>

            {showDayPicker && (
              <div
                style={{
                  position: "absolute",
                  top: 45,
                  right: 0,
                  zIndex: 999,
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowDayPicker(false);
                  }}
                  inline
                />
              </div>
            )}
          </div>
        )}

        {viewMode === "personalizada" && (
          <div
            style={{
              position: "absolute",
              width: "130px",
              top: "30px",
              right: "170px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Início"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              placeholderText="Fim"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}

        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          style={{
            width: "130px",
            height: "37px",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="dia">Dia</option>
          <option value="personalizada">Personalizada</option>
        </select>
      </div>

      <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
        Atendimentos
      </h2>

      <div style={{ width: "80%", height: 310, margin: "0 auto" }}>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
}
