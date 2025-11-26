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

  // Modo dia
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDayPicker, setShowDayPicker] = useState(false);

  // Modo personalizada
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const destroyChart = () => {
    if (lineChartInstance.current) {
      lineChartInstance.current.destroy();
      lineChartInstance.current = null;
    }
  };

  const createChart = async () => {
    const ctx = lineChartRef.current;
    if (!ctx) return;

    let labels = [];
    let data = [];

    try {
      let response;

      // MODO DIA
      if (viewMode === "dia") {
        response = await api.get("/registros-atendimentos/dia", {
          params: {
            data: selectedDate.toISOString().split("T")[0],
          },
        });
      }

      // MODO PERSONALIZADA
      if (viewMode === "personalizada" && startDate && endDate) {
        response = await api.get("/registros-atendimentos/intervalo", {
          params: {
            inicio: startDate.toISOString().split("T")[0],
            fim: endDate.toISOString().split("T")[0],
          },
        });
      }

      const registros = response?.data || [];

      labels = registros.map((item) => item.hora || item.data);
      data = registros.map(
        (item) => item.quantidade_atendimentos ?? item.quantidadeAtendimentos
      );
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
        plugins: { legend: { display: false } },
        scales: {
          y: {
            title: {
              display: true,
              text: "Quantidade de Atendimentos",
              font: { size: 16 },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    createChart();
  }, [viewMode, selectedDate, startDate, endDate]);

  useEffect(() => {
    if (viewMode !== "dia") return;

    const interval = setInterval(() => createChart(), 30000);
    return () => clearInterval(interval);
  }, [viewMode]);

  return (
    <div className="dashboard-grafico">
      <h2 className="dashboard-grafico-title" style={{ color: "black" }}>
        Atendimentos
      </h2>

      {/* SELECT PRINCIPAL */}
      <select
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value)}
        style={{
          position: "absolute",
          width: "130px",
          height: "37px",
          top: "10px",
          right: "20px",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      >
        <option value="dia">Dia</option>
        <option value="personalizada">Personalizada</option>
      </select>

      {/* --------- MODO DIA → CALENDÁRIO COM ÍCONE --------- */}
      {viewMode === "dia" && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "160px",
          }}
        >
          <button
            onClick={() => setShowDayPicker(!showDayPicker)}
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row-reverse",
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
            <span>
              {selectedDate
                ? selectedDate.toLocaleDateString("pt-BR")
                : "Selecionar dia"}
            </span>
          </button>

          {showDayPicker && (
            <div
              style={{
                position: "absolute",
                top: 45,
                right: "200px",
                zIndex: 999,
                background: "#0a0a0aff",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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

      {/* --------- MODO PERSONALIZADA --------- */}
      {viewMode === "personalizada" && (
        <div
          style={{
            position: "absolute",
            top: "7px",
            right: "230px",
            display: "flex",
            flexDirection: "column",
            gap: "17px",
          }}
        >
          {/* DATA INICIAL */}
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Início"
            dateFormat="dd/MM/yyyy"
            className="input-data"
          />

          {/* DATA FINAL */}
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            placeholderText="Fim"
            dateFormat="dd/MM/yyyy"
            className="input-data"
          />
        </div>
      )}

      <div style={{ width: "90%", height: 320, margin: "0 auto" }}>
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
}
// IMPORTANTE!!!!!
// Caso não rode de primeira, tente instalar as dependências abaixo: 
//  >>> npm install react-datepicker date-fns

